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

export class HistorialVacunaModel {
  static async getAll () {
    try {
      const [hVacuna] = await connection.query('select hv.IdHistorialVacunas, DATE(hv.Fecha) Fecha, v.IdVacuna, v.nombre nombreVacuna, BIN_TO_UUID(m.IdMascota) IdMascota, m.Nombre nombreMascota, m.IdDuenio from Historial_Vacunas hv inner join vacuna v on v.IdVacuna = hv.IdVacuna inner join mascota m on m.IdMascota = hv.IdMascota;')
      if (hVacuna.length === 0) {
        return { msg: 'No hay ningun historial de vacunación registrado' }
      }
      return hVacuna
    } catch (e) {
      return { err: 'Error obteniendo historial de vacuna', msg: e.message }
    }
  }

  static async getById ({ id }) {
    try {
      const [hVacuna] = await connection.query('call Consultar_Historial_Vacunas(?);', [id])
      if (hVacuna[0].length === 0) {
        return {
          typeErr: 1,
          err: 'Historial de Vacuna no Registrado'
        }
      }
      console.log(hVacuna[0][0])
      return hVacuna[0]
    } catch (error) {
      return {
        typeErr: 0,
        err: 'Error Buscando historia de vacuna',
        msg: error
      }
    }
  }

  static async create ({ data }) {
    try {
      const { nombreVacuna, IdMascota } = data
      // console.log(data)
      let [vacuna] = await connection.query('select IdVacuna from Vacuna where nombre = ?;', [nombreVacuna.toLowerCase()])
      // console.log(vacuna)
      if (vacuna.length === 0) {
        await connection.query('Call Crear_Vacuna(?);', [nombreVacuna.toLowerCase()]);
        [vacuna] = await connection.query('select IdVacuna from Vacuna where nombre = ?;', [nombreVacuna.toLowerCase()])
      }
      const { IdVacuna } = vacuna[0]
      await connection.query('call Crear_Historial_Vacunas(?, ?);', [IdVacuna, IdMascota])
      return { msg: 'Historial de Vacuna Registrado' }
    } catch (error) {
      return {
        err: 'Error creando Mascota'
      }
    }
  }

  static async delete ({ id }) {
    try {
      const hVacuna = await this.getById({ id })
      if (hVacuna.err) {
        return { err: 'Historial de vacuna no está registrado' }
      } else {
        await connection.query('call Eliminar_Historial_Vacunas(?);', [id])
        return { msg: 'Historial de vacuna eliminado con exito' }
      }
    } catch (error) {
      return {
        err: 'Error eliminado Historial de vacuna'
      }
    }
  }

  static async update ({ id, data }) {
    try {
      const hVacuna = await this.getById({ id })
      if (hVacuna.err) {
        return { err: 'Historial Vacunas no está registrado' }
      } else {
        const newHVacuna = { ...hVacuna[0], ...data }
        console.log(newHVacuna)
        const { Fecha, IdVacuna, IdMascota } = newHVacuna
        await connection.query('call Actualizar_Historial_Vacunas(?, ?, ?, ?);', [id, Fecha, IdVacuna, IdMascota])
        return { msg: 'Historial Vacunas actualizado con exito' }
      }
    } catch (error) {
      return {
        err: 'Error actualizando Historial Vacunas'
      }
    }
  }
}
