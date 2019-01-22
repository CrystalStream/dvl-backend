const mongoose = require('mongoose')
const autoIncrement = require('mongoose-sequence')(mongoose)
const timestamps = require('mongoose-timestamp')
const addHours = require('../utils/addHours')
const Configs = require('./Configs')

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

  Configs.findOne({}, {}, { sort: { 'created_at' : -1 } }, (err, config) => {
    if (err) res.status(500).end()
    this.totalPrice = this.totalTime * config.pricePerHour
    next()
  })
})

module.exports = mongoose.model('Ticket', TicketSchema) 
