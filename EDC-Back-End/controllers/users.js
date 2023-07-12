const bcrypt = require('bcryptjs')
const validator = require('validator')
const Signup = require('../models/signup')
const StartupSupport = require('../models/userStartupSupport')
const { validateRequest } = require('../services/common.utils')
const ErrorClass = require('../services/error')
const { generateRandomOTP, generateToken } = require('../services/common.utils')
const { sendEmail, mailOTPTemp } = require('../services/mail')
const { BRANCHES, STATUS, ROLE, ACTIVITY } = require('../constants/constant')
const { passwordRegex } = require('../constants/regex')
const {
  MESSAGES: { ERROR, INFO, SUCCESS },
} = require('../constants/constant')
const EventMeeting = require('../models/eventMeeting')
const Notification = require('../models/notification')

const SubjectEmail = 'Horizon Tech signup verification code'

module.exports.login = async (req, res, next) => {
  try {
    const isInvalidRequest = validateRequest(req.body, {
      email: true,
      password: true,
      rememberMe: true,
    })
    if (isInvalidRequest) {
      throw new ErrorClass(ERROR.INVALID_REQ, 400)
    }
    const { email, password, rememberMe } = req.body

    const isUserExits = await Signup.findOne({
      email,
    })
    if (!isUserExits) {
      throw new ErrorClass(ERROR.INVALID_USER, 404)
    }
    if (!isUserExits.otpVerified) {
      throw new ErrorClass(INFO.EMAIL_VERIFICATION, 403)
    }
    const passwordMatch = await bcrypt.compare(password, isUserExits.password)
    if (!passwordMatch) {
      throw new ErrorClass(ERROR.INVALID_CREDENTIAL, 400)
    }
    const now = new Date()

    // Add 60 minutes to the current time
    let tokenExpTime = new Date(now.getTime() + 60 * 60 * 1000)
    if (rememberMe) {
      tokenExpTime = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
    }
    // Output the future time

    const token = generateToken(isUserExits, rememberMe)

    // Update user document with new token if not already present
    await Signup.findOneAndUpdate(
      { email: req.body?.email },
      { $addToSet: { token } },
    )

    res.status(200).send({
      message: SUCCESS.USER_LOGGEDIN,
      data: {
        email,
        token,
        firstName: isUserExits?.firstName,
        lastName: isUserExits?.lastName,
        phoneNumber: isUserExits?.phoneNumber,
        role: isUserExits?.role,
        tokenExpTime,
        branch: isUserExits?.branch,
      },
    })
  } catch (err) {
    next(err)
  }
}

module.exports.signup = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const isInvalidRequest = validateRequest(req.body, {
      firstName: true,
      lastName: true,
      password: true,
      email: true,
      phoneNumber: true,
    })

    if (isInvalidRequest) {
      throw new ErrorClass(ERROR.INVALID_REQ, 400)
    }
    const isUserExits = await Signup.findOne({
      email,
    })
    if (isUserExits && isUserExits?.otpVerified) {
      throw new ErrorClass(ERROR.USER_EXITS, 409)
    }
    if (!passwordRegex.test(password) || !validator.isEmail(email)) {
      throw new ErrorClass(ERROR.PASSWORD_VALIDATION, 400)
    }

    const mailOtp = generateRandomOTP()
    const htmlTemp = mailOTPTemp(mailOtp)
    const mailOptions = {
      to: email,
      subject: SubjectEmail,
      html: htmlTemp,
    }
    await sendEmail(mailOptions)
    const userData = {
      ...req.body,
      mailOTP: mailOtp,
      otpVerified: false,
      isForgotPassword: false,
      role: ROLE.STUDENT,
    }
    const salt = await bcrypt.genSaltSync(10)
    userData.password = bcrypt.hashSync(password, salt)

    if (isUserExits && !isUserExits.otpVerified) {
      await Signup.findOneAndUpdate({ email }, userData)
    } else {
      const insertData = new Signup(userData)
      await insertData.save()
    }

    res.send({ message: INFO.OTP_VERIFICATION, email, status: 202 })
  } catch (err) {
    next(err)
  }
}

// use for verify mail otp and forgot password otp
module.exports.verifyMailOtp = async (req, res, next) => {
  const { email, isForgotPassword } = req.body
  try {
    const isInvalidRequest = validateRequest(req.body, {
      email: true,
      otp: true,
      isForgotPassword: true,
    })

    if (isInvalidRequest) {
      throw new ErrorClass(ERROR.INVALID_REQ, 400)
    }
    const isUserExits = await Signup.findOne({
      email,
    })
    if (!isUserExits) {
      throw new ErrorClass(ERROR.INVALID_USER, 404)
    }
    if (isUserExits.mailOTP === req.body?.otp) {
      if (isForgotPassword) {
        await Signup.updateOne(
          { email },
          {
            $set: {
              isForgotPassword: true,
            },
          },
        )
        res.send({ message: SUCCESS.SET_NEW_PASSWORD, status: 200 })
      } else {
        await Signup.updateOne(
          { email },
          {
            $set: {
              otpVerified: true,
            },
          },
        )
        res.send({ message: SUCCESS.LOGIN_MSG, status: 200 })
      }
    } else {
      throw new ErrorClass(ERROR.INCORRECT_OTP, 401)
    }
  } catch (e) {
    next(e)
  }
}

// use for forgot password and resend mail otp
module.exports.resendMailOTP = async (req, res, next) => {
  try {
    const isInvalidRequest = validateRequest(req.body, {
      email: true,
      isForgotPassword: true,
    })
    if (isInvalidRequest) {
      throw new ErrorClass(ERROR.INVALID_REQ, 400)
    }
    const { isForgotPassword, email } = req.body
    const isUserExits = await Signup.findOne({
      email,
    })
    if (!isUserExits) {
      throw new ErrorClass(ERROR.INVALID_USER, 404)
    }

    const mailOtp = generateRandomOTP()
    const htmlTemp = mailOTPTemp(mailOtp)
    const mailOptions = {
      to: email,
      subject: SubjectEmail,
      html: htmlTemp,
    }
    await sendEmail(mailOptions)
    let updateSignupColl = {
      $set: {
        mailOTP: mailOtp,
      },
    }
    if (isForgotPassword) {
      updateSignupColl = {
        $set: {
          mailOTP: mailOtp,
          isForgotPassword: false,
        },
      }
    }
    await Signup.updateOne({ email }, updateSignupColl)
    res.send({
      message: SUCCESS.OTP_RESEND,
      status: 200,
    })
  } catch (e) {
    next(e)
  }
}

module.exports.setNewPassword = async (req, res, next) => {
  try {
    const isInvalidRequest = validateRequest(req.body, {
      email: true,
      newPassword: true,
      confirmNewPassword: true,
    })
    const { email, newPassword, confirmNewPassword } = req.body
    if (isInvalidRequest) {
      throw new ErrorClass(ERROR.INVALID_REQ, 400)
    }
    if (newPassword !== confirmNewPassword) {
      throw new ErrorClass(ERROR.PASSWORD_MISSMATCH, 400)
    }
    const isUserExits = await Signup.findOne({
      email,
    })
    if (!isUserExits) {
      throw new ErrorClass(ERROR.INVALID_USER, 404)
    }
    const salt = await bcrypt.genSaltSync(10)
    const setNewPassword = bcrypt.hashSync(req.body?.newPassword, salt)
    await Signup.updateOne(
      { email },
      {
        $set: {
          password: setNewPassword,
        },
      },
    )
    res.send({ message: SUCCESS.SET_PASSWORD, status: 200 })
  } catch (e) {
    next(e)
  }
}

module.exports.logout = async (req, res, next) => {
  try {
    await Signup.findOneAndUpdate(
      { email: req.user?.email },
      { $pull: { token: req?.token } },
    )
    res.json({ message: SUCCESS.LOGOUT_SUCCESSFUL })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: ERROR.INTERNAL_SERVER_ERROR })
  }
}
module.exports.userStartupSupport = async (req, res, next) => {
  try {
    const isInvalidRequest = validateRequest(req.body, {
      name: true,
      email: true,
      contact: true,
      location: true,
      institute: false,
      otherInstitute: false,
      aadhar: false,
      category: true,
      categoryOther: false,
      otherUniversity: false,
      otherOrganisation: false,
      designation: false,
      enrollmentNum: false,
      teamSize: false,
      teamMembers: true,
      title: true,
      uniqueFeatures: true,
      currentStage: true,
    })

    const { email, title, category, location } = req.body
    if (isInvalidRequest) {
      throw new ErrorClass(ERROR.INVALID_REQ, 400)
    }

    const isAlreadyApplied = await StartupSupport.findOne({
      email,
    })
    if (isAlreadyApplied) {
      throw new ErrorClass(INFO.ALREADY_APPLIED, 400)
    }

    const startupId =
      location.substring(0, 2).toUpperCase() +
      category.substring(0, 2).toUpperCase() +
      title.substring(0, 2).toUpperCase() +
      generateRandomOTP()
    const branch = BRANCHES[location]
    const startupData = new StartupSupport({
      ...req.body,
      startupId,
      branch,
      status: STATUS.PENDING,
    })
    await startupData.save()

    await Notification.findOneAndUpdate(
      {},
      {
        $push: {
          userStartupSupports: [{ startup: startupData._id }],
        },
      },
      { new: true, upsert: true },
    )

    res.send({ message: SUCCESS.APPLICATION_SUBMIT, status: 200 })
  } catch (error) {
    next(error)
  }
}

module.exports.fileUpload = async (req, res, next) => {
  try {
    const isInvalidRequest = validateRequest(req?.file, {
      fieldname: false,
      originalname: true,
      encoding: false,
      mimetype: false,
      buffer: true,
      size: false,
    })

    if (isInvalidRequest) {
      throw new ErrorClass(ERROR.INVALID_REQ, 400)
    }

    const fileBuffer = Buffer.from(req?.file?.buffer, 'base64')

    await StartupSupport.updateOne(
      { email: req.user?.email },
      {
        $set: {
          file: fileBuffer,
          fileName: req?.file?.originalname,
        },
      },
    )

    res.status(200).json({ message: SUCCESS.FILE_UPLOADED })
  } catch (err) {
    console.error(err)
    next(err)
  }
}

module.exports.downloadFile = async (req, res, next) => {
  try {
    const isInvalidRequest = validateRequest(req.query, {
      startupId: true,
    })

    if (isInvalidRequest) {
      throw new ErrorClass(ERROR.INVALID_REQ, 400)
    }
    const fileData = await StartupSupport.findOne({
      startupId: req.query?.startupId,
    }).select('file fileName')
    if (fileData) {
      res.set({
        'Content-Disposition': `attachment; filename=${fileData.fileName}`,
        'Content-Type': 'application/octet-stream',
      })
      res.send(fileData.file)
    } else {
      res.status(200).json({ message: ERROR.FILE_NOT_EXITS })
    }
  } catch (err) {
    console.error(err)
    next(err)
  }
}

module.exports.startupStatus = async (req, res, next) => {
  try {
    const data = await StartupSupport.findOne({
      email: req?.user?.email,
    }).select('status startupId fileName')
    if (!data) {
      throw new ErrorClass(ERROR.NO_STARTUP_WITH_EMAIL, 400)
    }
    res.send({
      message: SUCCESS.STATUS_FETCHED,
      startupStatus: data?.status || 'N/A',
      startupId: data.startupId,
      fileName: data.fileName,
      status: 200,
    })
  } catch (err) {
    console.error(err)
    next(err)
  }
}

module.exports.getUserMeetingAndEvent = async (req, res, next) => {
  try {
    const data = await EventMeeting.find({
      members: { $in: req?.user?.email },
    }).select('-_id -__v -createdAt -updatedAt')
    const meetings = []
    const events = []
    if (data.length) {
      data.forEach((meetingOrEvent) => {
        if (meetingOrEvent.type === ACTIVITY.MEETING) {
          meetings.push(meetingOrEvent)
        } else {
          events.push(meetingOrEvent)
        }
      })
    }
    res.status(200).send({
      message: data.length
        ? SUCCESS.EVENT_MEETING_FETCHED
        : ERROR.NO_EVENT_MEETING_FOUND,
      meetingCount: meetings.length ? meetings.length : 0,
      eventCount: events.length ? events.length : 0,
      meetings,
      events,
    })
  } catch (err) {
    console.error(err)
    next(err)
  }
}
