/* eslint-disable camelcase */
import mysql from 'mysql2/promise'
import { HistorialVacunaModel } from './modelHistorialVacuna.js'

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '1234',
  database: 'db_veterinaria'
}
const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG
let connection
try {
  connection = await mysql.createConnection(connectionString)
} catch (error) {
  throw new Error('error connecting')
}

export class MedicalHistoryModel {
  static async getAll () {
    try {
      const [medicalHistory] = await connection.query('select IdHistoria_Clinica, Fecha, Motivo, Sintomatologia, Diagnostico, Procedimiento, MedicamentosAlergia, BIN_TO_UUID(IdMascota) IdMascota, IdOrden, IdVeterinario from historia_clinica;')

      if (medicalHistory.length === 0) {
        return { msg: 'No hay registros en el historial clinico' }
      }
      return medicalHistory
    } catch (e) {
      return { err: 'Error obteniendo el historial clinico' }
    }
  }

  static async getById ({ id }) {
    try {
      const [medicalHistory] = await connection.query('call Consultar_Historia_Clinica(?);', [id])
      if (medicalHistory[0].length === 0) {
        return {
          typeErr: 1,
          err: 'Registro del historial clinico no existe'
        }
      }
      return medicalHistory[0]
    } catch (error) {
      return {
        typeErr: 0,
        err: 'Error buscando registro del historial clinico'
      }
    }
  }

  static async create ({ data }) {
    try {
      // const { id } = data
      // const medicalHistory = await this.getById({ id })
      // if (medicalHistory.length > 0) {
      //   return { err: 'Registro del historial clinico ya existe' }
      // } else {
      const { Motivo, Sintomatologia, Diagnostico, Procedimiento, MedicamentosAlergia, NombreMascota, CedulaDueño, IdVeterinario } = data
      let { IdOrden } = data
      // validar idOrden, consultar id mascota, validar procedimiento vacuna
      if (IdOrden) { // si hay orden
        const [orden] = await connection.query('call Consultar_Orden(?);', [IdOrden])
        if (!orden[0]) { // validar idOrden
          return {
            typeErr: 1,
            err: 'Orden ya existe'
          }
        }
      } else {
        IdOrden = null
      }
      const [Mascota] = await connection.query('select BIN_TO_UUID(IdMascota) IdMascota from mascota where Nombre = ? and IdDuenio = ?;', [NombreMascota, CedulaDueño])
      if (!Mascota[0]) { // validar si hay mascota
        return {
          typeErr: 1,
          err: 'Mascota no existe'
        }
      }
      const { IdMascota } = Mascota[0]
      console.log(Motivo, Sintomatologia, Diagnostico, Procedimiento, MedicamentosAlergia, IdMascota, IdOrden, IdVeterinario)
      await connection.query('call Crear_Historia_Clinica(?, ?, ?, ?, ?, ?, ?, ?);', [Motivo, Sintomatologia, Diagnostico, Procedimiento, MedicamentosAlergia, IdMascota, IdOrden, IdVeterinario])
      // crear registro historial de vacunas si es el caso
      const { NombreVacunas } = data
      if (NombreVacunas) {
        NombreVacunas.forEach(async element => {
          await HistorialVacunaModel.create({
            Vacuna: element,
            IdMascota
          })
        })
      }
      return { msg: 'registro del historial clinico registrado con exito' }
      // }
    } catch (error) {
      return {
        err: 'Error creando historial clinico',
        msg: error
      }
    }
  }

  static async delete ({ id }) {
    try {
      const medicalHistory = await this.getById({ id })
      if (medicalHistory.err) {
        return { err: 'registro del historial clinico no registrado' }
      } else {
        await connection.query('call Eliminar_Historia_Clinica(?);', [id])
        return { msg: 'registro del historial clinico eliminado con exito' }
      }
    } catch (error) {
      return {
        err: 'Error eliminado registro del historial clinico'
      }
    }
  }

  static async update ({ id, data }) {
    try {
      const medicalHistory = await this.getById({ id })
      if (medicalHistory.err) {
        return { err: 'registro del historial clinico no registrado' }
      } else {
        const regAct = { ...medicalHistory[0], ...data }
        const { Fecha, Motivo, Sintomatologia, Diagnostico, Procedimiento, MedicamentosAlergia, IdMascota, IdOrden, IdVeterinario } = regAct
        console.log(Fecha, Motivo, Sintomatologia, Diagnostico, Procedimiento, MedicamentosAlergia, IdMascota, IdOrden, IdVeterinario)
        await connection.query('call Actualizar_Historia_Clinica(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', [id, Fecha, Motivo, Sintomatologia, Diagnostico, Procedimiento, MedicamentosAlergia, IdMascota, IdOrden, IdVeterinario])
        return { msg: 'registro del historial clinico actualizado con exito' }
      }
    } catch (error) {
      return {
        err: 'Error actualizando registro del historial clinico'
      }
    }
  }
}
