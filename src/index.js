require('dotenv').config()
const express = require('express')
require('./database')
const app = express()

app.listen(process.env.PORT, () => {
  console.log(`Aplicação escutando na porta ${process.env.PORT}`)
})
