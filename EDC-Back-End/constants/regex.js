const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/
const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/
const yearMonthRegex = /^\d{4}-\d{2}$/

module.exports = { passwordRegex, dateFormatRegex, yearMonthRegex }
