/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose')

const SignupSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: [3, 'Minimum 3 letters required'],
      maxlength: [20, 'Maximum 20 letters allowed'],
    },
    lastName: {
      type: String,
      required: true,
      minlength: [3, 'Minimum 3 letters required'],
      maxlength: [20, 'Maximum 20 letters allowed'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 10,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    otpVerified: {
      type: Boolean,
      require: true,
    },
    mailOTP: {
      type: String,
    },
    isForgotPassword: {
      type: Boolean,
      require: true,
    },
    token: [
      {
        type: String,
      },
    ],
    role: { type: String, required: true },
    branch: { type: [String], required: false },
  },
  {
    timestamps: true,
  },
)

SignupSchema.post('save', (error, doc, next) => {
  if (error.code === 11000) {
    next({ code: 400, message: 'Phone number should be unique !' })
  } else {
    next(error)
  }
})

const Signup = mongoose.model('users', SignupSchema)

module.exports = Signup
