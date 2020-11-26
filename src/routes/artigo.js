const express = require('express')
const {
  create,
  edit,
  remove,
  list,
  save,
  update,
} = require('../controllers/artigo')

const router = express.Router()

router
  .get('/', list)
  .get('/create', create)
  .post('/save', save)
  .get('/update/:id', edit)
  .post('/update/:id', update)
  .get('/delete/:id', remove)

module.exports = router
