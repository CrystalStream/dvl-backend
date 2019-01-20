const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const dayjs = require('dayjs')
require('dayjs/locale/es')

// db setup
require('./src/config/db')

dayjs.locale('es')

const indexRouter = require('./src/routes/index')
const ticketsRouter = require('./src/routes/tickets')
const adminRouter = require('./src/routes/admin')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views/'));

app.use('/', indexRouter)
app.use('/admin', adminRouter)
app.use('/api', ticketsRouter)

module.exports = app
