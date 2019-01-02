const escpos = require('escpos')
const getPrinterMessages = require('../utils/getPrinterMessages')
const Ticket = require('../models/Ticket')

function createTicket(req, res) {
  const { tutor, child, time } = req.body
  const ticket = new Ticket({ tutor, child, totalTime: time })

  ticket.save(function (err) {
    if (err) return res.status(500).json({ error: err })
      const messages = getPrinterMessages(ticket)

      try {
        printTicket(messages)
        res.status(200).json({ success: true, ticket })
      } catch(err) {
        res.status(500).json({ error: 'Printer not responding' })
      }
  })
}

function onlyPrintTicket(req, res) {
  const messages = getPrinterMessages(req.body, true)

  try {
    printTicket(messages)
    res.status(200).json({ success: true })
  } catch(err) {
    res.status(500).json({ error: 'Printer not responding' })
  }
}

function printTicket({ ticketHeader, ticketBody, ticketFooter}) {
  // Select the adapter based on your printer type
  const device  = new escpos.USB()
  const printer = new escpos.Printer(device)

  device.open(function(){
    printer
      .encode('utf8')
      .font('a')
      .align('ct')
      .style('bu')
      .size(1, 1)
      .text(ticketHeader)
      .align('lt')
      .text(ticketBody)
      .text(ticketFooter)
      .close()
  });
}

module.exports = {
  createTicket,
  onlyPrintTicket
}