const dayjs = require('dayjs')

function printedMessage({ father, child, time }) {

  const arriveTime = dayjs().format('h:mm a')
  const leaveTime = dayjs().add((time * 60), 'm').format('h:mm a');
  const total = parseFloat(time.toFixed(2), 10) * 40

  const ticketHeader = `
  |== DIVERTILANDIA ==|
  _____________________
  | ${dayjs().format('DD/MMMM/YYYY')} |
  =====================
  `

  const ticketBody = `
  * Padre o Tutor:
    ${father}
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
      ${time.toFixed(2)} Hora(s)
    --------------------
  * TOTAL: 
      $${total.toFixed(2)}
    --------------------
  `

  const ticketFooter = `
  Por cada 3 tickets recibe
  30 min gratis en tu siguiente
  visita.

  Quejas y sugerencias
  TEL (01) 341 XXX XX XX
  \n\n\n
  `

  return {
    ticketHeader,
    ticketBody,
    ticketFooter
  }
}

module.exports = printedMessage