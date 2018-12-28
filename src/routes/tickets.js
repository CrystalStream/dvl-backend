const express = require('express')
const router = express.Router()
const TiketCtrl = require('../controllers/ticketsController')

/* POST print tikcet. */
router.post('/ticket', TiketCtrl.createTicket)

module.exports = router
