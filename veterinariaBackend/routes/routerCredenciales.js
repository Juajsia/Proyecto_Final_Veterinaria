import { Router } from 'express'
import { CredController } from '../controllers/controllerCredenciales.js'
import { validateToken } from '../middlewares/validateToken.js'
import { validateRolToken } from '../middlewares/validateRolToken.js'

export const createCredRouter = ({ CredModel }) => {
  const credRouter = Router()

  const credController = new CredController({ CredModel })

  credRouter.get('/', validateToken, validateRolToken([1]), credController.getAll)
  credRouter.get('/:user', validateToken, validateRolToken([1]), credController.getByUser)
  credRouter.get('/ced/:user', validateToken, validateRolToken([1]), credController.getByCedula)
  credRouter.post('/', validateToken, validateRolToken([1]), credController.create)
  credRouter.delete('/:user', validateToken, validateRolToken([1]), credController.delete)
  credRouter.patch('/:oldUser', validateToken, validateRolToken([1]), credController.update)

  credRouter.post('/login', credController.login)

  return credRouter
}
