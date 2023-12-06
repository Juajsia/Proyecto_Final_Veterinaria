import jwt from 'jsonwebtoken'

export const validateToken = (req, res, next) => {
  const headerToken = req.get('authorization')
  if (headerToken !== undefined && headerToken.startsWith('Bearer ')) {
    try {
      const token = headerToken.slice(7)
      jwt.verify(token, process.env.SECRET_KEY)
      next()
    } catch (error) {
      res.status(401).json({
        err: 'token no valido'
      })
    }
  } else {
    res.status(401).json({
      err: 'Accedo denegado'
    })
  }
}
