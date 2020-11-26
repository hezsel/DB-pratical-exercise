const example = require('./example')
const artigo = require('./artigo')
const evento = require('./evento')
const atividades = require('./atividades')
const home = require('./home')

const routes = (app) => {
  app.use('/example', example)
  app.use('/artigo', artigo)
  app.use('/evento', evento)
  app.use('/atividades', atividades)
  app.use('/', home)
}

module.exports = routes
