const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session');
const flash = require('express-flash')
const logger = require('morgan')
const dayjs = require('dayjs')
require('dayjs/locale/es')

// db setup
require('./src/config/db')

dayjs.locale('es')

const ticketsRouter = require('./src/routes/tickets')
const adminRouter = require('./src/routes/admin')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({ cookie: { maxAge: 60000 }, secret: 'XQWESFWEGRGERG', resave: false, saveUninitialized: false}));
app.use(flash())
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views/'));

app.use('/admin', adminRouter)
app.use('/api', ticketsRouter)

// 404
app.use((req, res, next) => {
  res.redirect('/admin')
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

module.exports = app
