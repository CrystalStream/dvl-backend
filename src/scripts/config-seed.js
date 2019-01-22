const seeder = require('mongoose-seed')
const config = require('../config/main-config')

const data = [
  {
    'model': 'Configs',
    'documents': [
      {
        'pricePerHour': 30
      }
    ]
  }
]

// Connect to MongoDB via Mongoose
seeder.connect(config.db.uri, function() {
 
  // Load Mongoose models
  seeder.loadModels([
    'src/models/Configs.js'
  ])
 
  // Clear specified collections
  seeder.clearModels(['Configs'], function() {
 
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      seeder.disconnect()
    })
 
  })
})
