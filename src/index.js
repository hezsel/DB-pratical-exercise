require('dotenv').config()
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const routes = require('./routes')
app.use(express.urlencoded({
  extended: true
}))
app.use(cors())
app.use(bodyParser.json())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, '../public')))

routes(app)

app.listen(process.env.PORT, () => {
  console.log(`Aplicação escutando na porta ${process.env.PORT}`)
})
