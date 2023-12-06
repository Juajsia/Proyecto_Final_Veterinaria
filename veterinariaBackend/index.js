import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import { createPersonRouter } from './routes/routerPerson.js'
import { createPetRouter } from './routes/routerPet.js'
import { PersonModel } from './models/modelPerson.js'
import { PetModel } from './models/modelPet.js'
import { createCredRouter } from './routes/routerCredenciales.js'
import { CredModel } from './models/modelCredenciales.js'
import { validateToken } from './middlewares/validateToken.js'
import { validateRolToken } from './middlewares/validateRolToken.js'
import { createMedicalHistoryRouter } from './routes/routerHistoriaClinica.js'
import { MedicalHistoryModel } from './models/modelHistoriaClinica.js'
import { createHistorialVacunasRouter } from './routes/routerHistorialVacuna.js'
import { HistorialVacunaModel } from './models/modelHistorialVacuna.js'
import { createOrdenRouter } from './routes/routerOrden.js'
import { OrdenModel } from './models/modelOrden.js'
import { crearConexion } from './db.js'

const connection = await crearConexion()

const app = express()
app.use(cors())
app.use(express.json())
const personModel = new PersonModel(connection)
app.use('/api/person', validateToken, validateRolToken([1]), createPersonRouter({ PersonModel: personModel }))
const petModel = new PetModel(connection)
app.use('/api/pet', validateToken, validateRolToken([1, 2]), createPetRouter({ PetModel: petModel }))
const medicalHistoryModel = new MedicalHistoryModel(connection)
app.use('/api/medicalHistory', validateToken, validateRolToken([1, 2]), createMedicalHistoryRouter({ MedicalHistoryModel: medicalHistoryModel }))
const historialVacunaModel = new HistorialVacunaModel(connection)
app.use('/api/historialVacuna', validateToken, validateRolToken([1, 2]), createHistorialVacunasRouter({ HistorialVacunaModel: historialVacunaModel }))
const ordenModel = new OrdenModel(connection)
app.use('/api/orden', validateToken, validateRolToken([1, 2]), createOrdenRouter({ OrdenModel: ordenModel }))
const credModel = new CredModel(connection)
app.use('/api/user', createCredRouter({ CredModel: credModel }))

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`server listen on port: ${PORT}`)
})
