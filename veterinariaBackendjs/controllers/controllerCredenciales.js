import { validateCred, validateParcialCred } from '../schemas/schemaCredenciales.js'

export class CredController {
  constructor ({ CredModel }) {
    this.CredModel = CredModel
  }

  getAll = async (req, res) => {
    const creds = await this.CredModel.getAll()
    res.json(creds)
  }

  getByUser = async (req, res) => {
    const { user } = req.params
    const cred = await this.CredModel.getByUser({ user })
    if (cred.err) {
      res.status(404).json(cred)
    } else {
      res.json(cred)
    }
  }

  create = async (req, res) => {
    // valuserar data
    const result = validateCred(req.body)

    if (result.error) {
      res.status(400).json({ err: JSON.parse(result.error.message) })
    } else {
      const cred = await this.CredModel.create({ data: result.data })
      if (cred.err) {
        res.status(400).json(cred)
      } else {
        res.json(cred)
      }
    }
  }

  delete = async (req, res) => {
    const { user } = req.params
    const cred = await this.CredModel.delete({ user })
    if (cred.err) {
      res.status(400).json(cred)
    } else {
      res.json(cred)
    }
  }

  update = async (req, res) => {
    const result = validateParcialCred(req.body)

    if (result.error) {
      res.status(400).json({ err: JSON.parse(result.error.message) })
    } else {
      const { oldUser } = req.params
      const updatedcred = await this.CredModel.update({ oldUser, data: result.data })

      if (updatedcred.err) {
        res.status(400).json(updatedcred)
      } else {
        res.json(updatedcred)
      }
    }
  }

  login = async (req, res) => {
    const result = validateParcialCred(req.body)
    if (result.error) {
      res.status(400).json({ err: JSON.parse(result.error.message) })
    } else {
      const loginUser = await this.CredModel.login({ data: result.data })

      if (loginUser.err) {
        res.status(400).json(loginUser)
      } else {
        res.json(loginUser)
      }
    }
  }
}
