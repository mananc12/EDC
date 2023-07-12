const nodemailer = require('nodemailer')
const ErrorClass = require('./error')

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_ACCOUNT_USER,
    pass: process.env.MAIL_ACCOUNT_PASSWORD,
  },
})

async function sendEmail({ to, subject, html }) {
  try {
    const mailOptions = {
      to,
      subject,
      html,
    }
    mailOptions.from = `Horizon Tech <${process.env.MAIL_ACCOUNT_USER}>`

    const res = await transporter.sendMail(mailOptions)
    return res
  } catch (err) {
    throw new ErrorClass(err.message, 400)
  }
}

function mailOTPTemp(mailOTP) {
  return `
    <html>
  <head>
    <style>
      /* Email styles */
      body {
        font-family: Arial, sans-serif;
        font-size: 16px;
        line-height: 1.5;
        margin: 0;
        padding: 0;
        color: #333333;
      }
      h1 {
        font-size: 28px;
        font-weight: bold;
        margin: 0 0 20px;
        text-align: center;
      }
      p {
        margin: 0 0 20px;
      }
      /* Button styles */
      .button {
        display: inline-block;
        background-color: #333333;
        color: #ffffff;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 4px;
      }
      .button:hover {
        background-color: #555555;
      }
    </style>
  </head>
  <body>
    <h1>Verification Process from Horizon Tech as you have Signup</h1>
    <p>Your OTP is <b>${mailOTP}</b></p>
  </body>
</html>`
}

module.exports = {
  sendEmail,
  mailOTPTemp,
}
