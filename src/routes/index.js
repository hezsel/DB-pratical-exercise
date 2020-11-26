const example = require('./example')
const artigo = require('./artigo')
const evento = require('./evento')
const atividades = require('./atividades')

const routes = (app) => {
  app.use('/example', example)
  app.use('/artigo', artigo)
  app.use('/evento', evento)
  app.use('/atividades', atividades)
}

module.exports = routes
