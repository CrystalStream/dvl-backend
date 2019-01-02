const express = require('express')
const router = express.Router()
const TiketCtrl = require('../controllers/ticketsController')

/* POST save tikce. */
router.post('/ticket', TiketCtrl.createTicket)

/* POST print ticket */
router.post('/ticket/print', TiketCtrl.onlyPrintTicket)

module.exports = router
