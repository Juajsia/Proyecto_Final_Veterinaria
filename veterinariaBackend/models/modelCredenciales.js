/* eslint-disable camelcase */
// import mysql from 'mysql2/promise'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class CredModel {
  constructor (connection) {
    this.connection = connection
  }

  async getAll () {
    try {
      const [creds] = await this.connection.query('select * from credenciales;')

      if (creds.length === 0) {
        return { msg: 'No hay credenciales Registradas' }
      }
      return creds
    } catch (e) {
      return { err: 'Error obteniendo las credenciales' }
    }
  }

  async getByUser ({ user }) {
    try {
      const [creds] = await this.connection.query('call Consultar_Credenciales(?);', [user])
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

  async getByCedula ({ id }) {
    try {
      const [creds] = await this.connection.query('select * from credenciales where idPersona = ?;', [id])
      if (creds.length === 0) {
        return {
          typeErr: 1,
          err: 'credenciales no Registradas'
        }
      }
      return creds
    } catch (error) {
      return {
        typeErr: 0,
        err: 'Error Buscando credenciales',
        msg: error.message
      }
    }
  }

  async create ({ data }) {
    try {
      const { Usuario } = data
      const cred = await this.getByUser({ user: Usuario })
      if (cred.length > 0) {
        return { err: 'usuario ya registrado' }
      } else {
        const { Contrasenia, idPersona } = data
        const password = await bcrypt.hash(Contrasenia, 12)
        await this.connection.query('call Crear_Credenciales(?, ?, ?);', [Usuario, password, idPersona])
        return { msg: `usuario ${Usuario} registrado con exito` }
      }
    } catch (error) {
      return {
        err: 'Error creando credenciales',
        msg: error
      }
    }
  }

  async delete ({ user }) {
    try {
      const cred = await this.getByUser({ user })
      if (cred.err) {
        return { err: 'usuario no está registrado' }
      } else {
        await this.connection.query('call Eliminar_Credenciales(?);', [user])
        return { msg: 'credenciales eliminadas con exito' }
      }
    } catch (error) {
      return {
        err: 'Error eliminado credenciales',
        msg: error
      }
    }
  }

  async update ({ oldUser, data }) {
    try {
      const cred = await this.getByUser({ user: oldUser })
      if (cred.err) {
        return { err: 'credenciales no están registradas' }
      } else {
        const usuarioAct = { ...cred[0], ...data }
        const { Usuario: newUser, Contrasenia, idPersona } = usuarioAct
        const password = await bcrypt.hash(Contrasenia, 12)
        await this.connection.query('call Actualizar_Credenciales(?, ?, ?, ?);', [oldUser, newUser, password, idPersona])
        return { msg: 'credenciales actualizadas con exito' }
      }
    } catch (error) {
      return {
        err: 'Error actualizando credenciales',
        msg: error
      }
    }
  }

  async login ({ data }) {
    const { Usuario, Contrasenia } = data
    try {
      const [cred] = await this.connection.query('Select * from credenciales where Usuario = ?;', [Usuario])
      if (cred.length === 0) {
        return {
          typeErr: 1,
          err: 'Error en usuario/contraseña'
        }
      }
      const eq = await bcrypt.compare(Contrasenia, cred[0].Contrasenia)
      if (!eq) {
        return { err: 'Error en usuario/contraseña' }
      }
      const [rol] = await this.connection.query('select IdRol from persona where cedula = ?;', [cred[0].idPersona])
      const token = createToken({ data: { Usuario, Rol: rol[0].IdRol } })
      return { succes: 'Login Correcto', token, Rol: rol[0].IdRol }
    } catch (error) {
      return {
        err: 'Error buscando credenciales',
        msg: error.message
      }
    }
  }
}

function createToken ({ data }) {
  const payLoad = {
    Usuario: data.Usuario,
    Rol: data.Rol
  }
  return jwt.sign(payLoad, process.env.SECRET_KEY)
}
