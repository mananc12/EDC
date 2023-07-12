const bcrypt = require('bcryptjs')
const { ACTIVITY, ROLE, LOCATION, BRANCHES } = require('../constants/constant')
const Signup = require('../models/signup')
const EventMeeting = require('../models/eventMeeting')
const StartupSupport = require('../models/userStartupSupport')

const branches = [
  'Parul University',
  'Vadodara Startup Studio',
  'Ahmedabad Startup Studio',
  'Rajkot Startup Studio',
  'Surat Startup Studio',
]
async function signupUsers() {
  const entries = []

  // Generate 100 random entries
  for (let i = 0; i < 100; i++) {
    const firstName = generateRandomString(3, 20)
    const lastName = generateRandomString(3, 20)
    const email = `${generateRandomString(10, 20)}@example.com`
    const phoneNumber = generateRandomNumberString(10)
    const salt = bcrypt.genSaltSync(10)
    const password = bcrypt.hashSync('Abc@1234567', salt)
    const otpVerified = true
    const isForgotPassword = false
    const role = generateRandomRole()
    const branch = generateRandomBranch()
    const entry = {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      otpVerified,
      isForgotPassword,
      role,
    }
    if (role === ROLE.ADMIN) {
      entry.branch = branch
    }
    entries.push(entry)
  }

  try {
    // Save the entries in bulk
    await Signup.insertMany(entries)
    console.log('Signup entries saved successfully')
  } catch (error) {
    console.error('Error while saving signup entries:', error)
  }
}

async function usersStartup() {
  const users = await Signup.find()
  const dataEntries = []
  for (let i = 0; i < users.length; i++) {
    const name = users[i].firstName
    const { email } = users[i]
    const contact = users[i].phoneNumber
    const location = branches[Math.floor(Math.random() * branches.length)]
    const institute = 'Some Institute'
    const otherInstitute = ''
    const aadhar = Math.floor(Math.random() * 1000000000000).toString() // random 12-digit Aadhar number
    const category = generateRandomString(10, 20)
    const categoryOther = generateRandomString(10, 20)
    const otherUniversity = generateRandomString(10, 20)
    const otherOrganisation = generateRandomString(10, 20)
    const designation = generateRandomString(10, 20)
    const enrollmentNum = generateRandomString(10, 20)
    const teamSize = randomNumberInRange(1, 5)
    const teamMembers = `User ${Math.floor(
      Math.random() * 100,
    )}, User ${Math.floor(Math.random() * 100)}, User ${Math.floor(
      Math.random() * 100,
    )}`
    const title = `Startup Title ${generateRandomString(10, 20)}`
    const uniqueFeatures = 'Unique features of startup'
    const currentStage =
      'Prototype stage (If you have developed any working prototype of a solution proposed)'
    const startupId =
      location.substring(0, 2).toUpperCase() +
      category.substring(0, 2).toUpperCase() +
      title.substring(0, 2).toUpperCase() +
      generateRandomNumber(6)
    const status = 'pending'
    const branch = BRANCHES[location]

    const data = {
      name,
      email,
      contact,
      location,
      institute,
      otherInstitute,
      aadhar,
      category,
      categoryOther,
      otherUniversity,
      otherOrganisation,
      designation,
      enrollmentNum,
      teamSize,
      teamMembers,
      title,
      uniqueFeatures,
      currentStage,
      startupId,
      status,
      branch,
    }
    if (users[i].role === ROLE.STUDENT) {
      dataEntries.push(data)
    }
  }
  try {
    await StartupSupport.insertMany(dataEntries)
    console.log('StartupSupport entries saved successfully')
  } catch (error) {
    console.error('Error while saving startupSupport entries:', error)
  }
}

async function eventAndMeetings() {
  const entries = []
  const res = await Signup.find()
  // Generate 100 random entries
  const startDate = new Date(2022, 0, 1) // January 1, 2022
  const endDate = new Date(2022, 11, 31) // December 31, 2022

  for (let i = 0; i < res.length; i++) {
    const title = generateRandomString(3, 20)
    const type = generateRandomScheduleType()
    const link = generateRandomString(3, 20)
    const description = generateRandomString(3, 20)
    const dateAndTime = randomDate(startDate, endDate)
    const createdByEmail = res[i].email
    const createdByName = res[i].firstName
    const filters = [{ location: res[i].branch[0] }]
    const entry = {
      title,
      type,
      link,
      description,
      dateAndTime,
      createdByEmail,
      createdByName,
      filters,
    }
    if (!entry.link) {
      delete entry.link
    }
    if (!entry.description) {
      delete entry.description
    }

    try {
      // eslint-disable-next-line no-await-in-loop
      const result = await StartupSupport.find({ $or: filters })
      const eventMembers = result.map((startup) => startup.email)
      entry.members = eventMembers
      entries.push(entry)
    } catch (error) {
      console.error('Error while fetching startup supports:', error)
    }
  }

  try {
    // Save the entries in bulk
    await EventMeeting.insertMany(entries)

    console.log('EventMeeting entries saved successfully')
  } catch (error) {
    console.error('Error while saving eventMeeting entries:', error)
  }
}

function generateRandomString(minLength, maxLength) {
  const length =
    minLength + Math.floor(Math.random() * (maxLength - minLength + 1))
  let result = ''

  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result
}

function generateRandomNumberString(length) {
  let result = ''

  const digits = '0123456789'

  for (let i = 0; i < length; i++) {
    result += digits.charAt(Math.floor(Math.random() * digits.length))
  }

  return result
}

function generateRandomRole() {
  const roles = ['admin', 'student']
  return roles[Math.floor(Math.random() * roles.length)]
}
function generateRandomScheduleType() {
  const types = ['event', 'meeting']
  return types[Math.floor(Math.random() * types.length)]
}

function randomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
function generateRandomBranch() {
  const res = []
  for (let i = 0; i < randomNumberInRange(2, 5); i++) {
    res.push(branches[randomNumberInRange(0, 4)])
  }
  return res
}
function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  )
}

function generateRandomNumber(length) {
  const min = 10 ** (length - 1)
  const max = 10 ** length - 1
  return Math.floor(Math.random() * (max - min + 1) + min)
}
module.exports = {
  signupUsers,
  eventAndMeetings,
  usersStartup,
}
