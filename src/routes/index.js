const example = require('./example')
const artigo = require('./artigo')
const evento = require('./evento')

const routes = (app) => {
  app.use('/example', example)
  app.use('/artigo', artigo)
  app.use('/evento', evento)
}

module.exports = routes
