import jwt from 'jsonwebtoken'

export const validateRolToken = (rol = []) => (req, res, next) => {
  const headerToken = req.get('authorization')
  const token = headerToken.slice(7)
  const payLoad = jwt.verify(token, process.env.SECRET_KEY)

  if (rol.includes(payLoad.Rol)) {
    next()
  } else {
    res.status(401).json({
      err: 'Permisos no acceptados'
    })
  }
}
