// import mysql from 'mysql2/promise'

export class OrdenModel {
  constructor (connection) {
    this.connection = connection
  }

  async getAll () {
    try {
      const [orden] = await this.connection.query('select * from orden;')
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

  async getById ({ id }) {
    try {
      const [orden] = await this.connection.query('call Consultar_Orden(?);', [id])
      if (orden[0].length === 0) {
        return {
          typeErr: 1,
          err: 'Orden no Registrado'
        }
      }
      // definir result
      const ordenResult = orden[0][0]
      const [ordenMedicamento] = await this.connection.query('select * from orden_medicamento where IdOrden = ?;', [id])
      const Medicamentos = []
      const promises = ordenMedicamento.map(async item => {
        const [medicamento] = await this.connection.query('call Consultar_Medicamento(?);', [item.IdMedicamento])
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

  async create ({ data }) {
    try {
      const { Medicamentos, IdMascota } = data
      // eslint-disable-next-line prefer-const
      await this.connection.query('CALL Crear_Orden(?, ?);', [IdMascota, false])
      const [ordenes] = await this.connection.query('Select * from Orden;')
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

  async delete ({ id }) {
    try {
      const orden = await this.getById({ id })
      if (orden.err) {
        return { err: 'Orden no está registrado' }
      } else {
        await this.connection.query('call EliminarTodo_Orden_Medicamento(?);', [id])
        await this.connection.query('call Eliminar_Orden(?);', [id])
        return { msg: 'Orden Eliminado con exito' }
      }
    } catch (error) {
      return {
        err: 'Error eliminado Orden'
      }
    }
  }

  async update ({ id, data }) {
    try {
      const orden = await this.getById({ id })
      if (orden.err) {
        return { err: 'Orden no está registrado' }
      } else {
        const newHVacuna = { ...orden, ...data }
        console.log(newHVacuna)
        const { IdOrden, IdMascota, Anulada, Medicamentos } = newHVacuna
        await this.connection.query('call EliminarTodo_Orden_Medicamento(?);', [id])
        insertMedicamentos(Medicamentos, IdOrden)
        await this.connection.query('call Actualizar_Orden(?, ?, ?);', [id, IdMascota, Anulada])
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
    let [medicamento] = await this.connection.query('select IdMedicamento from medicamento where nombre = ?;', [nombre.toLowerCase()])
    if (medicamento.length === 0) {
      await this.connection.query('Call Crear_Medicamento(?);', [nombre.toLowerCase()]);
      [medicamento] = await this.connection.query('select IdMedicamento from medicamento where nombre = ?;', [nombre.toLowerCase()])
    }
    const { IdMedicamento } = medicamento[0]
    await this.connection.query('call Crear_Orden_Medicamento(?, ?, ?);', [IdInsertado, IdMedicamento, Dosis])
  })
}
