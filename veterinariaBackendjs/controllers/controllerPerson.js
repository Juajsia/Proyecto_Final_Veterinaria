import { validateParcialPerson, validatePerson } from '../schemas/schemaPerson.js'

export class PersonController {
  constructor ({ PersonModel }) {
    this.PersonModel = PersonModel
  }

  getAll = async (req, res) => {
    const people = await this.PersonModel.getAll()
    res.json(people)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const person = await this.PersonModel.getById({ id })
    if (person.err) {
      res.status(404).json(person)
    } else {
      res.json(person)
    }
  }

  create = async (req, res) => {
    // validar data
    const result = validatePerson(req.body)

    if (result.error) {
      res.status(400).json({ err: JSON.parse(result.error.message) })
    } else {
      console.log(result.data)
      const person = await this.PersonModel.create({ data: result.data })
      if (person.err) {
        res.status(400).json(person)
      } else {
        res.json(person)
      }
    }
  }

  delete = async (req, res) => {
    const { id } = req.params
    const person = await this.PersonModel.delete({ id })
    if (person.err) {
      res.status(400).json(person)
    } else {
      res.json(person)
    }
  }

  update = async (req, res) => {
    const result = validateParcialPerson(req.body)

    if (result.error) {
      res.status(400).json({ err: JSON.parse(result.error.message) })
    } else {
      const { id } = req.params
      const updatedperson = await this.PersonModel.update({ id, data: result.data })

      if (updatedperson.err) {
        res.status(400).json(updatedperson)
      } else {
        res.json(updatedperson)
      }
    }
  }
}
