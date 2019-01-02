
const mongoose = require('mongoose')
const config = require('./main-config.json')

mongoose.Promise = global.Promise

const connection = mongoose.connect(config.db.uri)

connection
  .then(db => {
    console.log(
      `Successfully connected to ${config.db.uri} MongoDB cluster in ${
        config.env
      } mode.`,
    )
    return db
  })
  .catch(err => {
    if (err.message.code === 'ETIMEDOUT') {
      console.log('Attempting to re-establish database connection.')
      mongoose.connect(config.db.uri)
    } else {
      console.log('Error while attempting to connect to database:')
      console.log(err)
    }
  })

  module.exports = connection
  