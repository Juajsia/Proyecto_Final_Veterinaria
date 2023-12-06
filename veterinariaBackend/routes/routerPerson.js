import { Router } from 'express'
import { PersonController } from '../controllers/controllerPerson.js'

export const createPersonRouter = ({ PersonModel }) => {
  const personRouter = Router()

  const personController = new PersonController({ PersonModel })

  personRouter.get('/', personController.getAll)
  personRouter.get('/:id', personController.getById)
  personRouter.post('/', personController.create)
  personRouter.delete('/:id', personController.delete)
  personRouter.patch('/:id', personController.update)

  return personRouter
}
