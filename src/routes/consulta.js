const express = require('express')
const {
  chooseParticipants,
  getTime,
  confirm,
  list,
  finalize,
  cancel,
} = require('../controllers/consulta')

const router = express.Router()

router
  .get('/', list)
  .get('/create', chooseParticipants)
  .get('/choose-date', getTime)
  .post('/confirm', confirm)
  .post('/finalize', finalize)
  .post('/cancel', cancel)

module.exports = router
