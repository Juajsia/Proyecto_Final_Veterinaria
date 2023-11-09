import express from 'express'
import { createPersonRouter } from './routes/routerPerson.js'
import { PersonModel } from './models/modelPerson.js'

const app = express()

app.use(express.json())
app.use('/api/person', createPersonRouter({ PersonModel }))

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`server listen on port http://localhost:${PORT}`)
})
