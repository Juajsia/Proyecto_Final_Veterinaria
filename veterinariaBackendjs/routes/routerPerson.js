import { Router } from 'express'
import { personController } from '../controllers/controllerPerson.js'

export const routerPerson = Router()

routerPerson.get('/', personController.getAll)
