const mongoose = require('mongoose')

const NotificationSchema = mongoose.Schema({
  userStartupSupports: [
    {
      startup: {
        type: mongoose.Schema.Types.ObjectId, // populate StartupSupport collection
        ref: 'StartupSupport',
      },
      viewed: { type: Boolean, default: false },
    },
  ],
  eventAndMeetings: [
    {
      eventMeeting: {
        type: mongoose.Schema.Types.ObjectId, // populate EventMeeting collection
        ref: 'EventMeeting',
      },
      viewed: { type: Boolean, default: false },
    },
  ],
})

const Notification = mongoose.model('notifications', NotificationSchema)

module.exports = Notification
