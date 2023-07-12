const jwt = require('jsonwebtoken')
const Signup = require('../models/signup')

const auth = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(400).send({
      message: 'Please provide authorization header',
    })
  } else {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.TOKEN_KEY)
      const user = await Signup.findOne({
        email: decoded.email,
        token: { $in: [token] },
      })
      if (!user) throw new Error('No User Found !')
      req.user = user
      req.token = token
      next()
    } catch (error) {
      if (error.message === 'jwt expired')
        res.status(401).send({ error: 'Token Expired, login again.' })
      else res.status(401).send({ error: error.message })
    }
  }
}

module.exports = { auth }
