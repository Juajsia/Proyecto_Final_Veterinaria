import { Router } from 'express'
import { PetController } from '../controllers/controllerPet.js'

export const createPetRouter = ({ PetModel }) => {
  const petRouter = Router()

  const petController = new PetController({ PetModel })

  petRouter.get('/', petController.getAll)
  petRouter.get('/:id', petController.getById)
  petRouter.post('/', petController.create)
  petRouter.delete('/:id', petController.delete)
  petRouter.patch('/:id', petController.update)

  return petRouter
}
