const express = require('express')
const {
  create,
  edit,
  remove,
  list,
  save,
  update,
} = require('../controllers/paciente')

const router = express.Router()

router
  .get('/', list)
  .get('/create', create)
  .post('/save', save)
  .get('/update/:cpf', edit)
  .post('/update/:cpf', update)
  .get('/delete/:cpf', remove)

module.exports = router
