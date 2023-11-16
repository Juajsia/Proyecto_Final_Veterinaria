import { validateParcialMedicalHistory, validateMedicalHistory } from '../schemas/schemaHistoriaClinica.js'

export class MedicalHistoryController {
  constructor ({ MedicalHistoryModel }) {
    this.MedicalHistoryModel = MedicalHistoryModel
  }

  getAll = async (req, res) => {
    const medicalHistory = await this.MedicalHistoryModel.getAll()
    res.json(medicalHistory)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const medicalHistory = await this.MedicalHistoryModel.getById({ id })
    if (medicalHistory.err) {
      res.status(404).json(medicalHistory)
    } else {
      res.json(medicalHistory)
    }
  }

  create = async (req, res) => {
    // validar data
    const result = validateMedicalHistory(req.body)

    if (result.error) {
      res.status(400).json({ err: JSON.parse(result.error.message) })
    } else {
      console.log(result.data)
      const medicalHistory = await this.MedicalHistoryModel.create({ data: result.data })
      if (medicalHistory.err) {
        res.status(400).json(medicalHistory)
      } else {
        res.json(medicalHistory)
      }
    }
  }

  delete = async (req, res) => {
    const { id } = req.params
    const medicalHistory = await this.MedicalHistoryModel.delete({ id })
    if (medicalHistory.err) {
      res.status(400).json(medicalHistory)
    } else {
      res.json(medicalHistory)
    }
  }

  update = async (req, res) => {
    const result = validateParcialMedicalHistory(req.body)

    if (result.error) {
      res.status(400).json({ err: JSON.parse(result.error.message) })
    } else {
      const { id } = req.params
      const updatedMedicalHistory = await this.MedicalHistoryModel.update({ id, data: result.data })

      if (updatedMedicalHistory.err) {
        res.status(400).json(updatedMedicalHistory)
      } else {
        res.json(updatedMedicalHistory)
      }
    }
  }
}
