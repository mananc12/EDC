const express = require('express'),
  userRouter = express.Router(),
  userController = require('../controllers/users'),
  { auth } = require('../middleware/auth')

const { upload } = require('../services/multer')

userRouter.post('/login', userController.login)
userRouter.post('/signup', userController.signup)
userRouter.post('/verify-mail-otp', userController.verifyMailOtp)
userRouter.post('/resend-otp', userController.resendMailOTP)
userRouter.post('/set-new-password', userController.setNewPassword)
userRouter.get('/logout', auth, userController.logout)
userRouter.post('/startup-details', userController.userStartupSupport)
userRouter.post(
  '/file-upload',
  upload.single('file'),
  auth,
  userController.fileUpload,
)
userRouter.get('/download-file', auth, userController.downloadFile)
userRouter.get('/startup-status', auth, userController.startupStatus)
userRouter.get(
  '/user-meetings-events',
  auth,
  userController.getUserMeetingAndEvent,
)

module.exports = userRouter
