import { Router } from 'express'
import { HistorialVacunaController } from '../controllers/controllerHistorialVacuna.js'

export const createHistorialVacunasRouter = ({ HistorialVacunaModel }) => {
  const HVacunasRouter = Router()
  const HVacunasController = new HistorialVacunaController({ HistorialVacunaModel })

  HVacunasRouter.get('/', HVacunasController.getAll)
  HVacunasRouter.get('/:id', HVacunasController.getById)
  HVacunasRouter.post('/', HVacunasController.create)
  HVacunasRouter.delete('/:id', HVacunasController.delete)
  HVacunasRouter.patch('/:id', HVacunasController.update)
  return HVacunasRouter
}
