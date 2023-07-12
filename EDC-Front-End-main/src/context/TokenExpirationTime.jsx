function TokenExpirationTime({ state, dispatch }) {
  if (!state?.tokenExpTime) {
    return null // or some default value or component if you want
  }

  const remainingTime = new Date(state?.tokenExpTime) - new Date()
  const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

  if (remainingTime < 0) {
    console.log('Token has expired')
    dispatch({ type: LOGOUT_SUCCESS })
  }
  // else {
  //   const hours = Math.floor(remainingTime / (1000 * 60 * 60))
  //   const minutes = Math.floor((remainingTime / (1000 * 60)) % 60)
  //   const seconds = Math.floor((remainingTime / 1000) % 60)

  //   console.info(`Token expires ${hours}h ${minutes}m ${seconds}s`)
  // }
}

export default TokenExpirationTime
