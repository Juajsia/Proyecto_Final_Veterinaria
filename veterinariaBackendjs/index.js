import express from 'express'
import { createPersonRouter } from './routes/routerPerson.js'
import { createPetRouter } from './routes/routerPet.js'
import { PersonModel } from './models/modelPerson.js'
import { PetModel } from './models/modelPet.js'

const app = express()

app.use(express.json())
app.use('/api/person', createPersonRouter({ PersonModel }))
app.use('/api/pet', createPetRouter({ PetModel }))

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`server listen on port http://localhost:${PORT}`)
})
