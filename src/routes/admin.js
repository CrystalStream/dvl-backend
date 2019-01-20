const express = require('express')
const router = express.Router()

/* GET admin home page. */
router.get('/', function(req, res, next) {
  res.render('admin/dashboard', { title: 'Express' })
})

module.exports = router
