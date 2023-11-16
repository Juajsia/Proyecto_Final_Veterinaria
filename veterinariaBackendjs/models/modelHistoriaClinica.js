/* eslint-disable camelcase */
import mysql from 'mysql2/promise'

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
      const [medicalHistory] = await connection.query('select * from historia_clinica;')

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
      const { id } = data
      const medicalHistory = await this.getById({ id })
      if (medicalHistory.length > 0) {
        return { err: 'Registro del historial clinico ya existe' }
      } else {
        const { motivo, sintomatologia, diagnostico, procedimiento, medicamentosAlergia, NombreMascota, cedulaDueño, IdOrden, idVeterinario } = data
        // validar idOrden, consultar id mascota, validar procedimiento vacuna
        const [orden] = await connection.query('call Consultar_Orden(?);', [IdOrden])
        if (orden[0].length !== 0) { // validar idOrden
          return {
            typeErr: 1,
            err: 'Orden ya existe'
          }
        }
        const [Mascota] = await connection.query('select BIN_TO_UUID(IdMascota) from mascota where Nombre = ? and IdDuenio = ?;', [NombreMascota, cedulaDueño])
        if (Mascota[0].length === 0) { // validar si hay mascota
          return {
            typeErr: 1,
            err: 'Mascota no existe'
          }
        }
        const { IdMascota } = Mascota
        await connection.query('call Crear_Historia_Clinica(?, ?, ?, ?, ?, ?, ?, ?);', [motivo, sintomatologia, diagnostico, procedimiento, medicamentosAlergia, IdMascota, IdOrden, idVeterinario])
        // crear registro historial de vacunas si es el caso
        return { msg: 'registro del historial clinico registrado con exito' }
      }
    } catch (error) {
      return {
        err: 'Error creando medicalHistorya',
        msg: error
      }
    }
  }

  static async delete ({ id }) {
    try {
      const medicalHistory = await this.getById({ id })
      if (medicalHistory.err) {
        return { err: 'usuario no está registrado' }
      } else {
        await connection.query('call Eliminar_medicalHistorya(?);', [id])
        return { msg: 'usuario eliminado con exito' }
      }
    } catch (error) {
      return {
        err: 'Error eliminado medicalHistorya'
      }
    }
  }

  static async update ({ id, data }) {
    try {
      const medicalHistory = await this.getById({ id })
      if (medicalHistory.err) {
        return { err: 'usuario no está registrado' }
      } else {
        const usuarioAct = { ...medicalHistory[0], ...data }
        const { Primer_nombre: primerNombre, Segundo_nombre: segundoNombre, Primer_Apellido: primerApellido, Segundo_Apellido: segundoApellido, edad, IdRol } = usuarioAct
        await connection.query('call Actualizar_medicalHistorya(?, ?, ?, ?, ?, ?, ?);', [id, primerNombre, segundoNombre, primerApellido, segundoApellido, edad, IdRol])
        return { msg: 'usuario actualizado con exito' }
      }
    } catch (error) {
      return {
        err: 'Error actualizando medicalHistorya'
      }
    }
  }
}
