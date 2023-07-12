const express = require('express'),
  adminRouter = express.Router(),
  adminController = require('../controllers/admin'),
  { auth } = require('../middleware/auth')

const { uploadLarge } = require('../services/multer')

adminRouter.get(
  '/all-startup-details',
  auth,
  adminController.getAllStartupDetails,
)
adminRouter.patch(
  '/update-startup-details',
  auth,
  adminController.updateStartupDetails,
)

adminRouter.post('/create-admin', auth, adminController.createAdmin)
adminRouter.delete('/delete-admin', auth, adminController.deleteAdmin)
adminRouter.get('/get-all-admin', auth, adminController.getAllAdmin)
adminRouter.post(
  '/schedule-event-meeting',
  auth,
  uploadLarge.single('poster'),
  adminController.scheduleEventOrMeeting,
)
adminRouter.get(
  '/get-lastmonth-startups',
  auth,
  adminController.getLastMonthStartups,
)
adminRouter.get(
  '/get-all-meeting-and-events',
  auth,
  adminController.getAllMeetingAndEvent,
)
adminRouter.delete('/delete-startup', auth, adminController.deleteStartup)

adminRouter.get(
  '/event-meeting-dates',
  auth,
  adminController.getEventMeetingDates,
)
adminRouter.get('/get-startups-user-email', auth, adminController.getUsersEmail)
adminRouter.patch(
  '/finance-startup-details',
  auth,
  adminController.updateFinanceStartupDetails,
)

adminRouter.get('/notifications', auth, adminController.sendNotification)
adminRouter.get('/clear-notifications', auth, adminController.clearNotification)

adminRouter.post(
  '/sec-stage-startup-support',
  auth,
  adminController.addSecStageStarupSupport,
)
adminRouter.get(
  '/sec-stage-startup-support',
  auth,
  adminController.getSecStageStarupSupport,
)
adminRouter.post('/finance-details', auth, adminController.addFinanceDetail)
adminRouter.get('/finance-details', auth, adminController.getFinanceDetail)
module.exports = adminRouter
