import express from 'express'
import { routerPerson } from './routes/routerPerson.js'

const app = express()

app.use(express.json())
app.use('/api/persona', routerPerson)

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`server listen on port http://localhost:${PORT}`)
})
