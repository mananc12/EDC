/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose')
const { ACTIVITY } = require('../constants/constant')

const { Schema } = mongoose

const EventMeetingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    link: String,
    members: { type: [String], required: true },
    dateAndTime: {
      type: Date,
      required: true,
    },
    type: { type: String, required: true, enum: ACTIVITY },
    filters: [{ type: Schema.Types.Mixed }],
    createdByName: { type: String, required: true },
    createdByEmail: { type: String, required: true },
    description: String,
    posterImage: String,
  },

  { timestamps: true },
)

EventMeetingSchema.pre('save', function (next) {
  if (!this.description) {
    delete this.description
  }
  if (!this.link) {
    delete this.link
  }
  if (!this.filters.length) {
    delete this.filters
  }
  next()
})

const EventMeeting = mongoose.model('event-or-meetings', EventMeetingSchema)

module.exports = EventMeeting
