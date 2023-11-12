/* eslint-disable camelcase */
import mysql from 'mysql2/promise'
import bcrypt from 'bcrypt'

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

export class CredModel {
  static async getAll () {
    try {
      const [creds] = await connection.query('select * from credenciales;')

      if (creds.length === 0) {
        return { msg: 'No hay credenciales Registradas' }
      }
      return creds
    } catch (e) {
      return { err: 'Error obteniendo las credenciales' }
    }
  }

  static async getByUser ({ user }) {
    try {
      const [creds] = await connection.query('call Consultar_Credenciales(?);', [user])
      if (creds[0].length === 0) {
        return {
          typeErr: 1,
          err: 'credenciales no Registradas'
        }
      }
      return creds[0]
    } catch (error) {
      return {
        typeErr: 0,
        err: 'Error Buscando credenciales'
      }
    }
  }

  static async create ({ data }) {
    try {
      const { Usuario } = data
      const cred = await this.getByUser({ user: Usuario })
      if (cred.length > 0) {
        return { err: 'usuario ya registrado' }
      } else {
        const { Contrasenia, idPersona } = data
        const password = await bcrypt.hash(Contrasenia, 12)
        await connection.query('call Crear_Credenciales(?, ?, ?);', [Usuario, password, idPersona])
        return { msg: `usuario ${Usuario} registrado con exito` }
      }
    } catch (error) {
      return {
        err: 'Error creando credenciales',
        msg: error
      }
    }
  }

  static async delete ({ user }) {
    try {
      const cred = await this.getByUser({ user })
      if (cred.err) {
        return { err: 'usuario no está registrado' }
      } else {
        await connection.query('call Eliminar_Credenciales(?);', [user])
        return { msg: 'credenciales eliminadas con exito' }
      }
    } catch (error) {
      return {
        err: 'Error eliminado credenciales',
        msg: error
      }
    }
  }

  static async update ({ oldUser, data }) {
    try {
      const cred = await this.getByUser({ user: oldUser })
      if (cred.err) {
        return { err: 'credenciales no están registradas' }
      } else {
        const usuarioAct = { ...cred[0], ...data }
        const { Usuario: newUser, Contrasenia, idPersona } = usuarioAct
        const password = await bcrypt.hash(Contrasenia, 12)
        await connection.query('call Actualizar_Credenciales(?, ?, ?, ?);', [oldUser, newUser, password, idPersona])
        return { msg: 'credenciales actualizadas con exito' }
      }
    } catch (error) {
      return {
        err: 'Error actualizando credenciales',
        msg: error
      }
    }
  }
}
