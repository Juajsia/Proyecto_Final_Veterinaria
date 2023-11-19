import express from 'express'
import 'dotenv/config'
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

const app = express()

app.use(express.json())
app.use('/api/person', validateToken, validateRolToken([1]), createPersonRouter({ PersonModel }))
app.use('/api/pet', validateToken, validateRolToken([1, 2]), createPetRouter({ PetModel }))
app.use('/api/person', validateToken, validateRolToken([1]), createPersonRouter({ PersonModel }))
app.use('/api/medicalHistory', createMedicalHistoryRouter({ MedicalHistoryModel }))
app.use('/api/historialVacuna', validateToken, validateRolToken([1, 2]), createHistorialVacunasRouter({ HistorialVacunaModel }))
app.use('/api/user', validateToken, validateRolToken([1, 2]), createCredRouter({ CredModel }))

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`server listen on port http://localhost:${PORT}`)
})
