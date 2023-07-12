// Define a custom Error class that extends the built-in Error class
class ErrorClass extends Error {
  constructor(message, code) {
    super(message)

    this.code = code
  }
}

// Export the ErrorClass so it can be used in other modules
module.exports = ErrorClass
