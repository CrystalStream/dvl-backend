const dayjs = require('dayjs')
const pad = require('./pad')

function getPrinterMessages({ tutor, child, totalTime, createAt, leaveDate, totalPrice, folio }) {

  const arriveTime = dayjs(createAt).format('h:mm a')
  const leaveTime = dayjs(leaveDate).format('h:mm a');
  const minutes = Math.floor((totalTime % 1) * 60)

  const ticketHeader = `
  |==== DIVERTILANDIA ====|
  ________________________
  |   ${dayjs().format('DD/MMMM/YYYY')}   |
  ========================
  ${pad(folio.toString(), 7)}
  `

  const ticketBody = `
  * Padre o Tutor:
      ${tutor}
    --------------------
  * Niño:
      ${child}
    --------------------
  * Hora de entrada: 
      ${arriveTime}
    --------------------
  * Hora de salida: 
      ${leaveTime}
    --------------------
  * Tiempo: 
      ${totalTime.toFixed(0)} Hora(s) con ${minutes} minutos
    --------------------
  * TOTAL: 
      $${totalPrice.toFixed(2)}
    --------------------
  `

  const ticketFooter = `
  Por cada 3 tickets recibe
  30 min gratis en tu siguiente
  visita.

  Quejas y sugerencias
  TEL (01) 341 XXX XX XX
  \n\n
  `

  return {
    ticketHeader,
    ticketBody,
    ticketFooter
  }
}

module.exports = getPrinterMessages