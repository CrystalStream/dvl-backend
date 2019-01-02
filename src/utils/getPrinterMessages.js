const dayjs = require('dayjs')
const pad = require('./pad')

function getPrinterMessages({ tutor, child, totalTime, createAt, leaveDate, totalPrice, folio }, isCopyForAdmin = false) {

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
      ${Math.floor(totalTime)} Hora(s) con ${minutes} minutos
    --------------------
  * TOTAL: 
      $${totalPrice.toFixed(2)}
    --------------------
  ${ isCopyForAdmin ? '\n\n' : ''}
  `

  let ticketFooter = `
  Por cada 3 tickets recibe
  30 min gratis en tu siguiente
  visita.

  Quejas y sugerencias
  Tel. 01 (375) 104 48 24
  Fb: divertilandiaTamazula
  \n\n
  `

  // Remove the footer for the copy admin
  if (isCopyForAdmin) ticketFooter = ''

  return {
    ticketHeader,
    ticketBody,
    ticketFooter
  }
}

module.exports = getPrinterMessages