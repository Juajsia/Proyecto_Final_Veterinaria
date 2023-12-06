import { validateOrden, validateParcialOrden } from '../schemas/schemaOrden.js'

export class OrdenController {
  constructor ({ OrdenModel }) {
    this.OrdenModel = OrdenModel
  }

  getAll = async (req, res) => {
    const orden = await this.OrdenModel.getAll()
    res.json(orden)
  }

  getById = async (req, res) => {
    const { id } = req.params

    const orden = await this.OrdenModel.getById({ id })
    if (orden.err) {
      res.status(404).json(orden)
    } else {
      res.json(orden)
    }
  }

  create = async (req, res) => {
    const result = validateOrden(req.body)

    if (result.error) {
      res.status(400).json({ err: JSON.parse(result.error.message) })
    } else {
      const orden = await this.OrdenModel.create({ data: result.data })
      if (orden.err) {
        res.status(400).json(orden)
      } else {
        res.json(orden)
      }
    }
  }

  delete = async (req, res) => {
    const { id } = req.params
    const orden = await this.OrdenModel.delete({ id })
    if (orden.err) {
      res.status(400).json(orden)
    } else {
      res.json(orden)
    }
  }

  update = async (req, res) => {
    const result = validateParcialOrden(req.body)

    if (result.error) {
      res.status(400).json({ err: JSON.parse(result.error.message) })
    } else {
      const { id } = req.params
      const updatedOrden = await this.OrdenModel.update({ id, data: result.data })

      if (updatedOrden.err) {
        res.status(400).json(updatedOrden)
      } else {
        res.json(updatedOrden)
      }
    }
  }
}
