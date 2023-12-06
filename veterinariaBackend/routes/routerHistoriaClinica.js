import { Router } from 'express'
import { MedicalHistoryController } from '../controllers/controllerHistoriaClinica.js'

export const createMedicalHistoryRouter = ({ MedicalHistoryModel }) => {
  const medicalHistoryRouter = Router()

  const medicalHistoryController = new MedicalHistoryController({ MedicalHistoryModel })

  medicalHistoryRouter.get('/', medicalHistoryController.getAll)
  medicalHistoryRouter.get('/:id', medicalHistoryController.getById)
  medicalHistoryRouter.get('/pet/:id', medicalHistoryController.getByPetId)
  medicalHistoryRouter.post('/', medicalHistoryController.create)
  medicalHistoryRouter.delete('/:id', medicalHistoryController.delete)
  medicalHistoryRouter.patch('/:id', medicalHistoryController.update)

  return medicalHistoryRouter
}
