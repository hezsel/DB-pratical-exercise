const example = require('./example')
const artigo = require('./artigo')

const routes = (app) => {
  app.use('/example', example)
  app.use('/artigo', artigo)
}

module.exports = routes
