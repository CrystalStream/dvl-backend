const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')

const ConfigsSchema = new mongoose.Schema({
  pricePerHour: {
    type: Number
  }
})

// Plugins
ConfigsSchema.plugin(timestamps)

module.exports = mongoose.model('Configs', ConfigsSchema) 
