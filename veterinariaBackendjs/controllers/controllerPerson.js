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
    const data = req.body
    const person = await this.PersonModel.create({ data })
    if (person.err) {
      res.status(400).json(person)
    } else {
      res.json(person)
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
}
