import mysql from 'mysql2/promise'

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '1234',
  database: 'db_Veterinaria'
}
const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG

const connection = await mysql.createConnection(connectionString)

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
        const { primerNombre, segundoNombre, primerApellido, segundoApellido, edad, IdRol } = data
        await connection.query('call Create_Persona(?, ?, ?, ?, ?, ?, ?);', [cedula, primerNombre, segundoNombre, primerApellido, segundoApellido, edad, IdRol])
        return { msg: `usuario ${primerNombre} registrado con exito` }
      }
    } catch (error) {
      return {
        err: 'Error creando Persona'
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
        err: 'Error eliminado Persona'
      }
    }
  }
}
