// import mysql from 'mysql2/promise'

import { crearConexion } from '../db.js'

const connection = await crearConexion()

export class OrdenModel {
  static async getAll () {
    try {
      const [orden] = await connection.query('select * from Orden;')
      if (orden.length === 0) {
        return { msg: 'No hay ninguna Orden Registrada' }
      }
      const result = []
      const promise = orden.map(async item => {
        result.push(await this.getById({ id: item.IdOrden }))
      })
      await Promise.all(promise)
      return result
    } catch (e) {
      return { err: 'Error obteniendo historial de vacuna', msg: e.message }
    }
  }

  static async getById ({ id }) {
    try {
      const [orden] = await connection.query('call Consultar_Orden(?);', [id])
      if (orden[0].length === 0) {
        return {
          typeErr: 1,
          err: 'Orden no Registrado'
        }
      }
      // definir result
      const ordenResult = orden[0][0]
      const [ordenMedicamento] = await connection.query('select * from orden_Medicamento where IdOrden = ?;', [id])
      const Medicamentos = []
      const promises = ordenMedicamento.map(async item => {
        const [medicamento] = await connection.query('call Consultar_Medicamento(?);', [item.IdMedicamento])
        const data = {
          IdMedicamento: item.IdMedicamento,
          nombre: medicamento[0][0].nombre,
          Dosis: item.Dosis
        }
        Medicamentos.push(data)
      })
      await Promise.all(promises)
      const result = {
        IdOrden: ordenResult.IdOrden,
        IdMascota: ordenResult.IdMascota,
        Anulada: ordenResult.Anulada,
        Medicamentos
      }
      return result
    } catch (error) {
      return {
        typeErr: 0,
        err: 'Error Buscando Orden',
        msg: error
      }
    }
  }

  static async create ({ data }) {
    try {
      const { Medicamentos, IdMascota } = data
      // eslint-disable-next-line prefer-const
      await connection.query('CALL Crear_Orden(?, ?);', [IdMascota, false])
      const [ordenes] = await connection.query('Select * from Orden;')
      const IdInsertado = ordenes[ordenes.length - 1].IdOrden
      console.log(IdInsertado)
      insertMedicamentos(Medicamentos, IdInsertado)
      return {
        msg: 'Orden reada con exito'
      }
    } catch (error) {
      return {
        err: 'Error creando Orden',
        msg: error.message
      }
    }
  }

  static async delete ({ id }) {
    try {
      const orden = await this.getById({ id })
      if (orden.err) {
        return { err: 'Orden no está registrado' }
      } else {
        await connection.query('call EliminarTodo_Orden_Medicamento(?);', [id])
        await connection.query('call Eliminar_Orden(?);', [id])
        return { msg: 'Orden Eliminado con exito' }
      }
    } catch (error) {
      return {
        err: 'Error eliminado Orden'
      }
    }
  }

  static async update ({ id, data }) {
    try {
      const orden = await this.getById({ id })
      if (orden.err) {
        return { err: 'Orden no está registrado' }
      } else {
        const newHVacuna = { ...orden, ...data }
        console.log(newHVacuna)
        const { IdOrden, IdMascota, Anulada, Medicamentos } = newHVacuna
        await connection.query('call EliminarTodo_Orden_Medicamento(?);', [id])
        insertMedicamentos(Medicamentos, IdOrden)
        await connection.query('call Actualizar_Orden(?, ?, ?);', [id, IdMascota, Anulada])
        return { msg: 'Historial Vacunas actualizado con exito' }
      }
    } catch (error) {
      return {
        err: 'Error actualizando Orden',
        msg: error.message
      }
    }
  }
}

function insertMedicamentos (Medicamentos = [], IdInsertado) {
  Medicamentos.forEach(async item => {
    const { nombre, Dosis } = item
    let [medicamento] = await connection.query('select IdMedicamento from Medicamento where nombre = ?;', [nombre.toLowerCase()])
    if (medicamento.length === 0) {
      await connection.query('Call Crear_Medicamento(?);', [nombre.toLowerCase()]);
      [medicamento] = await connection.query('select IdMedicamento from Medicamento where nombre = ?;', [nombre.toLowerCase()])
    }
    const { IdMedicamento } = medicamento[0]
    await connection.query('call Crear_Orden_Medicamento(?, ?, ?);', [IdInsertado, IdMedicamento, Dosis])
  })
}
