const example = require('./example')
const paciente = require('./paciente')
const home = require('./home')
const consulta = require('./consulta')

const routes = (app) => {
  app.use('/example', example)
  app.use('/paciente', paciente)
  app.use('/', home)
  app.use('/consulta', consulta)
}

module.exports = routes
