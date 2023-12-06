// import mysql from 'mysql2/promise'

export class HistorialVacunaModel {
  constructor (connection) {
    this.connection = connection
  }

  async getAll () {
    try {
      const [hVacuna] = await this.connection.query('select hv.IdHistorialVacunas, DATE(hv.Fecha) Fecha, v.IdVacuna, v.nombre nombreVacuna, BIN_TO_UUID(m.IdMascota) IdMascota, m.Nombre nombreMascota, m.IdDuenio from historial_vacunas hv inner join vacuna v on v.IdVacuna = hv.IdVacuna inner join mascota m on m.IdMascota = hv.IdMascota;')
      if (hVacuna.length === 0) {
        return { msg: 'No hay ningun historial de vacunación registrado' }
      }
      return hVacuna
    } catch (e) {
      return { err: 'Error obteniendo historial de vacuna', msg: e.message }
    }
  }

  async getById ({ id }) {
    try {
      const [hVacuna] = await this.connection.query('call Consultar_Historial_Vacunas(?);', [id])
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

  async create ({ data }) {
    try {
      const { nombreVacuna, IdMascota } = data
      // console.log(data)
      let [vacuna] = await this.connection.query('select IdVacuna from vacuna where nombre = ?;', [nombreVacuna.toLowerCase()])
      // console.log(vacuna)
      if (vacuna.length === 0) {
        await this.connection.query('Call Crear_Vacuna(?);', [nombreVacuna.toLowerCase()]);
        [vacuna] = await this.connection.query('select IdVacuna from vacuna where nombre = ?;', [nombreVacuna.toLowerCase()])
      }
      const { IdVacuna } = vacuna[0]
      await this.connection.query('call Crear_Historial_Vacunas(?, ?);', [IdVacuna, IdMascota])
      return { msg: 'Historial de Vacuna Registrado' }
    } catch (error) {
      return {
        err: 'Error creando Mascota'
      }
    }
  }

  async delete ({ id }) {
    try {
      const hVacuna = await this.getById({ id })
      if (hVacuna.err) {
        return { err: 'Historial de vacuna no está registrado' }
      } else {
        await this.connection.query('call Eliminar_Historial_Vacunas(?);', [id])
        return { msg: 'Historial de vacuna eliminado con exito' }
      }
    } catch (error) {
      return {
        err: 'Error eliminado Historial de vacuna'
      }
    }
  }

  async update ({ id, data }) {
    try {
      const hVacuna = await this.getById({ id })
      if (hVacuna.err) {
        return { err: 'Historial Vacunas no está registrado' }
      } else {
        const newHVacuna = { ...hVacuna[0], ...data }
        console.log(newHVacuna)
        const { Fecha, IdVacuna, IdMascota } = newHVacuna
        await this.connection.query('call Actualizar_Historial_Vacunas(?, ?, ?, ?);', [id, Fecha, IdVacuna, IdMascota])
        return { msg: 'Historial Vacunas actualizado con exito' }
      }
    } catch (error) {
      return {
        err: 'Error actualizando Historial Vacunas'
      }
    }
  }
}
