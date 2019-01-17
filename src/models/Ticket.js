const mongoose = require('mongoose')
const autoIncrement = require('mongoose-sequence')(mongoose)
const timestamps = require('mongoose-timestamp')
const addHours = require('../utils/addHours')
const config = require('../config/main-config')

const TicketSchema = new mongoose.Schema({
  tutor: {
    type: String,
    trim: true,
    required: true
  },
  child: {
    type: String,
    trim: true,
    required: true
  },
  leaveDate: Date,
  totalTime: Number,
  totalPrice: Number,
  folio: Number
})

// Plugins
TicketSchema.plugin(timestamps)
TicketSchema.plugin(autoIncrement, { inc_field: 'folio' })

// Hooks
TicketSchema.pre('save', function (next) {
  this.leaveDate = addHours(this.createdAt, this.totalTime)
  this.totalPrice = this.totalTime * config.pricePerHour
  next()
})

module.exports = mongoose.model('Ticket', TicketSchema) 
