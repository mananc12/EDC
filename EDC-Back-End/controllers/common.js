const EventMeeting = require('../models/eventMeeting')

const SubjectEmail = 'Horizon Tech signup verification code'

module.exports.getLatestPosterImage = async (req, res, next) => {
  try {
    console.log('AAA')
    const data = await EventMeeting.find()
      .sort({
        _id: -1,
      })
      .limit(1)

    console.log(data)
    res.redirect(`${process.env.PUBLIC_PATH}/${data[0].posterImage}`)
  } catch (err) {
    next(err)
  }
}
