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

export class PersonModel {
  static async getAll () {
    try {
      const [personas] = await connection.query('select * from Persona;')

      if (personas.length === 0) {
        return { msg: 'No hay Personas Registradas' }
      }
      return personas
    } catch (e) {
      return { err: 'Error obteniendo las Personas' }
    }
  }

  static async getById ({ id }) {
    try {
      const [personas] = await connection.query('call Consultar_Persona(?);', [id])
      if (personas[0].length === 0) {
        return {
          typeErr: 1,
          err: 'Cedula no Registrada'
        }
      }
      return personas[0]
    } catch (error) {
      return {
        typeErr: 0,
        err: 'Error Buscando Persona'
      }
    }
  }

  static async create ({ data }) {
    try {
      const { cedula } = data
      const person = await this.getById({ id: cedula })
      if (person.length > 0) {
        return { err: 'usuario ya registrado' }
      } else {
        const { Primer_nombre: primerNombre, Segundo_nombre: segundoNombre, Primer_Apellido: primerApellido, Segundo_Apellido: segundoApellido, edad, IdRol } = data
        await connection.query('call Create_Persona(?, ?, ?, ?, ?, ?, ?);', [cedula, primerNombre, segundoNombre, primerApellido, segundoApellido, edad, IdRol])
        return { msg: `usuario ${primerNombre} registrado con exito` }
      }
    } catch (error) {
      return {
        err: 'Error creando Persona',
        msg: error
      }
    }
  }

  static async delete ({ id }) {
    try {
      const person = await this.getById({ id })
      if (person.err) {
        return { err: 'usuario no está registrado' }
      } else {
        await connection.query('call Eliminar_Persona(?);', [id])
        return { msg: 'usuario eliminado con exito' }
      }
    } catch (error) {
      return {
        err: 'Error eliminado Persona',
        mgs: error.message
      }
    }
  }

  static async update ({ id, data }) {
    try {
      const person = await this.getById({ id })
      if (person.err) {
        return { err: 'usuario no está registrado' }
      } else {
        const usuarioAct = { ...person[0], ...data }
        const { Primer_nombre: primerNombre, Segundo_nombre: segundoNombre, Primer_Apellido: primerApellido, Segundo_Apellido: segundoApellido, edad, IdRol } = usuarioAct
        await connection.query('call Actualizar_Persona(?, ?, ?, ?, ?, ?, ?);', [id, primerNombre, segundoNombre, primerApellido, segundoApellido, edad, IdRol])
        return { msg: 'usuario actualizado con exito' }
      }
    } catch (error) {
      return {
        err: 'Error actualizando Persona'
      }
    }
  }
}
