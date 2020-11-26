const express = require('express')
const {
  show,
} = require('../controllers/home')

const router = express.Router()

router
  .get('/', show)

module.exports = router
