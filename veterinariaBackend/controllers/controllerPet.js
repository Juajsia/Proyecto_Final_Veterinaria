import { validateParcialPet, validatePet } from '../schemas/schemaPet.js'

export class PetController {
  constructor ({ PetModel }) {
    this.PetModel = PetModel
  }

  getAll = async (req, res) => {
    const pet = await this.PetModel.getAll()
    res.json(pet)
  }

  getById = async (req, res) => {
    const { id } = req.params

    const pet = await this.PetModel.getById({ id })
    if (pet.err) {
      res.status(404).json(pet)
    } else {
      res.json(pet)
    }
  }

  create = async (req, res) => {
    // validar data
    const result = validatePet(req.body)

    if (result.error) {
      res.status(400).json({ err: JSON.parse(result.error.message) })
    } else {
      const pet = await this.PetModel.create({ data: result.data })
      if (pet.err) {
        res.status(400).json(pet)
      } else {
        res.json(pet)
      }
    }
  }

  delete = async (req, res) => {
    const { id } = req.params
    const person = await this.PetModel.delete({ id })
    if (person.err) {
      res.status(400).json(person)
    } else {
      res.json(person)
    }
  }

  update = async (req, res) => {
    const result = validateParcialPet(req.body)

    if (result.error) {
      res.status(400).json({ err: JSON.parse(result.error.message) })
    } else {
      const { id } = req.params
      const updatedPet = await this.PetModel.update({ id, data: result.data })

      if (updatedPet.err) {
        res.status(400).json(updatedPet)
      } else {
        res.json(updatedPet)
      }
    }
  }
}
