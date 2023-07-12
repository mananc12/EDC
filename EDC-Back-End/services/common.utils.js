const jwt = require('jsonwebtoken')

module.exports.validateRequest = (request, params) => {
  let isInvalidRequest = Object.keys(request).some(
    (key) => !Object.keys(params).includes(key),
  )
  if (isInvalidRequest) return isInvalidRequest

  const invalidArray = [null, undefined, 'null', 'undefined', '']
  for (const key in params) {
    if (params[key] && invalidArray.includes(request[key])) {
      isInvalidRequest = true
      break
    }
  }
  return isInvalidRequest
}

module.exports.generateRandomOTP = () => {
  return Math.floor(100000 + Math.random() * 900000)
}

module.exports.generateToken = (user, rememberMe = false) => {
  return jwt.sign(
    {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profession: user.profession,
      phoneNumber: user.phoneNumber,
    },
    process.env.TOKEN_KEY,
    {
      expiresIn: rememberMe ? '7d' : '60m',
    },
  )
}
// function lke gen token,decypt password will be come in this utils file

module.exports.validateDateFormat = (dateString, regex) => {
  return regex.test(dateString)
}
