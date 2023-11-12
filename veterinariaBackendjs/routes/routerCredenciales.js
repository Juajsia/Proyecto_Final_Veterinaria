import { Router } from 'express'
import { CredController } from '../controllers/controllerCredenciales.js'

export const createCredRouter = ({ CredModel }) => {
  const credRouter = Router()

  const credController = new CredController({ CredModel })

  credRouter.get('/', credController.getAll)
  credRouter.get('/:user', credController.getByUser)
  credRouter.post('/', credController.create)
  credRouter.delete('/:user', credController.delete)
  credRouter.patch('/:oldUser', credController.update)

  credRouter.post('/login', credController.login)

  return credRouter
}
