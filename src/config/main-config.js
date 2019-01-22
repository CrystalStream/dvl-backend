module.exports = {
  env: process.env.NODE_ENV || 'development',
  db: {
    uri: 'mongodb://localhost:27017/dvl'
  }
}