const mongoose = require('mongoose')

const financeSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  type: { type: String, enum: ['credit', 'debit'], required: true },
  amount: { type: Number, required: true },
  remark: { type: String, required: true },
  transactionDetail: { type: String, required: true },
  billInvoiceLink: { type: String, required: true },
})

const financeDetailsSchema = new mongoose.Schema({
  startupId: { type: String, required: true },
  netBalance: { type: Number, required: true },
  finance: [financeSchema],
})

const FinanceDetails = mongoose.model('finances', financeDetailsSchema)

module.exports = FinanceDetails
