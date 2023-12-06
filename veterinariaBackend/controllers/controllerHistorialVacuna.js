import { validateHistorialVacunas, validateParcialHistorialVacunas } from '../schemas/schemasHistorialVacunas.js'

export class HistorialVacunaController {
  constructor ({ HistorialVacunaModel }) {
    this.HistorialVacunaModel = HistorialVacunaModel
  }

  getAll = async (req, res) => {
    const hVacuna = await this.HistorialVacunaModel.getAll()
    res.json(hVacuna)
  }

  getById = async (req, res) => {
    const { id } = req.params

    const hVacuna = await this.HistorialVacunaModel.getById({ id })
    if (hVacuna.err) {
      res.status(404).json(hVacuna)
    } else {
      res.json(hVacuna)
    }
  }

  create = async (req, res) => {
    // validar data
    const result = validateHistorialVacunas(req.body)

    if (result.error) {
      res.status(400).json({ err: JSON.parse(result.error.message) })
    } else {
      const hVacuna = await this.HistorialVacunaModel.create({ data: result.data })
      if (hVacuna.err) {
        res.status(400).json(hVacuna)
      } else {
        res.json(hVacuna)
      }
    }
  }

  delete = async (req, res) => {
    const { id } = req.params
    const hVacuna = await this.HistorialVacunaModel.delete({ id })
    if (hVacuna.err) {
      res.status(400).json(hVacuna)
    } else {
      res.json(hVacuna)
    }
  }

  update = async (req, res) => {
    const result = validateParcialHistorialVacunas(req.body)

    if (result.error) {
      res.status(400).json({ err: JSON.parse(result.error.message) })
    } else {
      const { id } = req.params
      const updatedhVacuna = await this.HistorialVacunaModel.update({ id, data: result.data })

      if (updatedhVacuna.err) {
        res.status(400).json(updatedhVacuna)
      } else {
        res.json(updatedhVacuna)
      }
    }
  }
}
