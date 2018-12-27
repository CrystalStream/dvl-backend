const express = require('express')
const router = express.Router()
const escpos = require('escpos')
const printedMessage = require('../utils/printedMessage')

/* POST print tikcet. */
router.post('/print', function(req, res, next) {
  try {
    // Select the adapter based on your printer type
    const device  = new escpos.USB();
     
    const printer = new escpos.Printer(device)

    const messages = printedMessage(req.body)

    device.open(function(){
      printer
        .encode('utf8')
        .font('a')
        .align('ct')
        .style('bu')
        .size(1, 1)
        .text(messages.ticketHeader)
        .align('lt')
        .text(messages.ticketBody)
        .text(messages.ticketFooter)
        .close();
    });

    res.status(200).json({ success: true, messages })

  } catch (e) {
    res.status(500).json({ error: e })
  }
  
})

module.exports = router
