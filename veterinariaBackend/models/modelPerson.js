/* eslint-disable camelcase */
// import mysql from 'mysql2/promise'

export class PersonModel {
  constructor (connection) {
    this.connection = connection
  }

  async getAll () {
    try {
      const [personas] = await this.connection.query('select * from persona;')

      if (personas.length === 0) {
        return { msg: 'No hay Personas Registradas' }
      }
      return personas
    } catch (e) {
      return { err: 'Error obteniendo las Personas' }
    }
  }

  async getById ({ id }) {
    try {
      const [personas] = await this.connection.query('call Consultar_Persona(?);', [id])
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

  async create ({ data }) {
    try {
      const { cedula } = data
      const person = await this.getById({ id: cedula })
      if (person.length > 0) {
        return { err: 'usuario ya registrado' }
      } else {
        const { Primer_nombre: primerNombre, Segundo_nombre: segundoNombre, Primer_Apellido: primerApellido, Segundo_Apellido: segundoApellido, edad, IdRol } = data
        await this.connection.query('call Create_Persona(?, ?, ?, ?, ?, ?, ?);', [cedula, primerNombre, segundoNombre, primerApellido, segundoApellido, edad, IdRol])
        return { msg: `usuario ${primerNombre} registrado con exito` }
      }
    } catch (error) {
      return {
        err: 'Error creando Persona',
        msg: error
      }
    }
  }

  async delete ({ id }) {
    try {
      const person = await this.getById({ id })
      if (person.err) {
        return { err: 'usuario no está registrado' }
      } else {
        await this.connection.query('delete from mascota where IdDuenio = ?;', [id])
        await this.connection.query('call Eliminar_Persona(?);', [id])
        return { msg: 'usuario eliminado con exito' }
      }
    } catch (error) {
      return {
        err: 'Error eliminado Persona',
        mgs: error.message
      }
    }
  }

  //  async delete ({ id }) {
  //   try {
  //     const person = await this.getById({ id })
  //     if (person.err) {
  //       return { err: 'usuario no está registrado' }
  //     } else {
  //       await this.connection.query('call Eliminar_Persona(?);', [id])
  //       return { msg: 'usuario eliminado con exito' }
  //     }
  //   } catch (error) {
  //     return {
  //       err: 'Error eliminado Persona',
  //       mgs: error.message
  //     }
  //   }
  // }

  async update ({ id, data }) {
    try {
      const person = await this.getById({ id })
      if (person.err) {
        return { err: 'usuario no está registrado' }
      } else {
        const usuarioAct = { ...person[0], ...data }
        const { Primer_nombre: primerNombre, Segundo_nombre: segundoNombre, Primer_Apellido: primerApellido, Segundo_Apellido: segundoApellido, edad, IdRol } = usuarioAct
        await this.connection.query('call Actualizar_Persona(?, ?, ?, ?, ?, ?, ?);', [id, primerNombre, segundoNombre, primerApellido, segundoApellido, edad, IdRol])
        return { msg: 'usuario actualizado con exito' }
      }
    } catch (error) {
      return {
        err: 'Error actualizando Persona'
      }
    }
  }
}
