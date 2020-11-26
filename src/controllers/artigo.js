const { Artigo } = require('../database')
const verifyIfExists = require('./utils/verifyIfExists')

const getById = (id) => Artigo.findOne({
  where: {
    id,
  }
})

const list = async (req, res) => {
  const artigos = await Artigo.findAll()

  res.render('artigo/index', {
    artigos,
  })
}

const create = (req, res) => {
  res.render('artigo/create')
}

const save = async (req, res) => {
  const {
    nome,
    resumo,
    autoria,
    data_de_publicacao,
  } = req.body

  const artigo = await Artigo.create({
    nome,
    resumo,
    autoria,
    data_de_publicacao,
  })

  verifyIfExists(res, artigo, 'artigo')

  res.redirect('/artigo')
}

const edit = async (req, res) => {
  const { id } = req.params

  const artigo = await getById(id)

  verifyIfExists(res, artigo, 'artigo')

  res.render('artigo/edit', {
    artigo,
  })
}

const update = async (req, res) => {
  const { id } = req.params
  const {
    nome,
    resumo,
    autoria,
    data_de_publicacao,
  } = req.body

  const artigo = await getById(id)

  verifyIfExists(res, artigo, 'artigo')

  await artigo.update({
    nome,
    resumo,
    autoria,
    data_de_publicacao,
  })

  res.redirect('/artigo')
}

const remove = async (req, res) => {
  const { id } = req.params

  const artigo = await getById(id)

  verifyIfExists(res, artigo, 'artigo')

  await artigo.destroy()

  res.redirect('/artigo')
}

module.exports = {
  create,
  save,
  edit,
  remove,
  list,
  update,
}
