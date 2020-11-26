const express = require('express')
const { show } = require('../controllers/example')

const router = express.Router()

router
  .get('/', show)

module.exports = router
