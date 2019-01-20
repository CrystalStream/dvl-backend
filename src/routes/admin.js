const express = require('express')
const router = express.Router()
const ConfigsController = require('../controllers/configsController')

/* GET admin home page. */
router.get('/', ConfigsController.renderForm)

router.post('/config', ConfigsController.updateConfiguration)

module.exports = router
