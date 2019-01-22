const Configs = require('../models/Configs')

function updateConfiguration(req, res) {
  const { pricePerHour } = req.body
  Configs.findOne({}, {}, { sort: { 'created_at' : -1 } }, function(err, config) {
    if (err) res.status(404)

    const { pricePerHour } = req.body
    config.pricePerHour = parseInt(pricePerHour, 10)

    config.save(function (err, updatedConfig) {
      let message = 'Configuracion guardada correctamente';
      let type = 'success'

      if (err) {
        message = 'Hubo un error tratando de guardar la configuration intentalo de nuevo!'
        type = 'error'
      }

      req.flash(type, message)
      res.redirect('/admin')
    })
  })
}

function renderForm(req, res) {
  Configs.findOne({}, {}, { sort: { 'created_at' : -1 } }, function(err, config) {
    if (err) res.status(404)
    const price = config.pricePerHour || 30
    
    res.render('admin/dashboard', { pricePerHour: config.pricePerHour })
  })
}

module.exports = {
  updateConfiguration,
  renderForm
}