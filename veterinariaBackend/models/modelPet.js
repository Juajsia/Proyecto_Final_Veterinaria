// import mysql from 'mysql2/promise'

export class PetModel {
  constructor (connection) {
    this.connection = connection
  }

  async getAll () {
    try {
      const [pet] = await this.connection.query('select BIN_TO_UUID(idMascota) as IDMascota,Nombre,Edad,Especie,Raza,Color,Tamanio,Peso,IdDuenio from mascota;')

      if (pet.length === 0) {
        return { msg: 'No hay Mascotas Registradas' }
      }
      return pet
    } catch (e) {
      return { err: 'Error obteniendo las Mascotas', msg: e }
    }
  }

  async getById ({ id }) {
    try {
      const [pet] = await this.connection.query('call Consultar_Mascota(?);', [id])
      if (pet[0].length === 0) {
        return {
          typeErr: 1,
          err: 'Mascota no Registrada'
        }
      }
      return pet[0]
    } catch (error) {
      return {
        typeErr: 0,
        err: 'Error Buscando Mascota',
        msg: error
      }
    }
  }

  async create ({ data }) {
    try {
      const { Nombre, IdDuenio } = data
      const [pet] = await this.connection.query('select BIN_TO_UUID(idMascota) IDMascota from mascota where Nombre = ? AND IdDuenio = ?', [Nombre, IdDuenio])
      if (pet.length > 0) {
        return { err: 'Mascota ya registrado' }
      } else {
        const { Edad, Especie, Raza, Color, Tamanio, Peso } = data
        await this.connection.query('call Crear_Mascota(?, ?, ?, ?, ?, ?, ?, ?);', [Nombre, Edad, Especie, Raza, Color, Tamanio, Peso, IdDuenio])
        return { msg: `Mascota ${Nombre} registrado con exito` }
      }
    } catch (error) {
      return {
        err: 'Error creando Mascota',
        msg: error.message
      }
    }
  }

  async delete ({ id }) {
    try {
      const pet = await this.getById({ id })
      if (pet.err) {
        return { err: 'Mascota no está registrado' }
      } else {
        await this.connection.query('delete from historia_clinica where IdMascota = UUID_TO_BIN(?);', [id])
        await this.connection.query('delete from historia_clinica where IdMascota = UUID_TO_BIN(?);', [id])
        await this.connection.query('call Eliminar_Mascota(?);', [id])
        return { msg: 'Mascota eliminado con exito' }
      }
    } catch (error) {
      return {
        err: 'Error eliminado Mascota',
        msg: error.message
      }
    }
  }

  async update ({ id, data }) {
    try {
      const pet = await this.getById({ id })
      if (pet.err) {
        return { err: 'usuario no está registrado' }
      } else {
        const usuarioAct = { ...pet[0], ...data }
        console.log(usuarioAct)
        const { Nombre, Edad, Especie, Raza, Color, Tamanio, Peso, IdDuenio } = usuarioAct
        await this.connection.query('call Actualizar_Mascota(?, ?, ?, ?, ?, ?, ?, ?, ?);', [id, Nombre, Edad, Especie, Raza, Color, Tamanio, Peso, IdDuenio])
        return { msg: 'Mascota actualizado con exito' }
      }
    } catch (error) {
      return {
        err: 'Error actualizando Mascota'
      }
    }
  }
}
