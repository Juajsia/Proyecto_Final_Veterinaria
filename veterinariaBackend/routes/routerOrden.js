import { Router } from 'express'
import { OrdenController } from '../controllers/controllerOrden.js'

export const createOrdenRouter = ({ OrdenModel }) => {
  const ordenRouter = Router()
  const ordenController = new OrdenController({ OrdenModel })

  ordenRouter.get('/', ordenController.getAll)
  ordenRouter.get('/:id', ordenController.getById)
  ordenRouter.post('/', ordenController.create)
  ordenRouter.delete('/:id', ordenController.delete)
  ordenRouter.patch('/:id', ordenController.update)
  return ordenRouter
}
