const { Evento, Atividades, Apresentado, Artigo } = require('../database')
const verifyIfExists = require('./utils/verifyIfExists')

const getById = (id, include) => Atividades.findOne({
  where: {
    id,
  },
  include,
})

const list = async (req, res) => {
  const atividades = await Atividades.findAll({
    include: [
      {
        model: Apresentado,
        as: 'apresentados',
      },
      {
        model: Evento,
        as: 'evento',
      },
    ],
  })

  res.render('atividades/index', {
    atividades,
  })
}

const create = async (req, res) => {
  const listaDeArtigos = await Artigo.findAll({
    attributes: ['id', 'nome', 'autoria'],
    raw: true,
  })

  const listaDeEventos = await Evento.findAll({
    attributes: ['id', 'nome', 'data'],
    raw: true,
  })

  res.render('atividades/create', {
    listaDeArtigos,
    listaDeEventos,
  })
}

const createApresentadoRelations = async (atividadeId, artigos) => {
  if (!artigos) return
  const list = typeof artigos === 'string' ? [artigos] : artigos
  for (const artigo of list) {
    await Apresentado.create({
      fk_Artigo_id: artigo,
      fk_Atividades_id: atividadeId,
    })
  }
}

const destroyApresentadoRelations = async (apresentados) => {
  for (const apresentado of apresentados) {
    await apresentado.destroy()
  }
}

const save = async (req, res) => {
  const {
    nome,
    horario,
    duracao,
    publico_alvo,
    valor_inscricao,
    data,
    lotacao,
    promotor,
    tema,
    afiliacao,
    objetivo,
    numero_sessao,
    Atividades_TIPO,
    fk_Evento_id,
    artigos,
  } = req.body

  const atividades = await Atividades.create({
    nome,
    horario,
    duracao,
    publico_alvo,
    valor_inscricao,
    data,
    lotacao,
    promotor,
    tema,
    afiliacao,
    objetivo,
    numero_sessao,
    Atividades_TIPO,
    fk_Evento_id,
  })

  verifyIfExists(res, atividades, 'atividades')

  await createApresentadoRelations(atividades.id, artigos)

  res.redirect('/atividades')
}

const getIdsOfArtigosFromApresentados = (list) => {
  const artigos = []
  for (const item of list) {
    artigos.push(item.fk_Artigo_id)
  }
  return artigos
}

const edit = async (req, res) => {
  const { id } = req.params

  const atividades = await getById(id, [
    {
      model: Apresentado,
      as: 'apresentados',
    },
  ])

  verifyIfExists(res, atividades, 'atividades')

  const listaDeArtigos = await Artigo.findAll({
    attributes: ['id', 'nome', 'autoria'],
    raw: true,
  })

  const listaDeEventos = await Evento.findAll({
    attributes: ['id', 'nome', 'data'],
    raw: true,
  })

  const artigosAtrelados = getIdsOfArtigosFromApresentados(atividades.apresentados)

  res.render('atividades/edit', {
    atividades,
    artigosAtrelados,
    listaDeArtigos,
    listaDeEventos,
  })
}

const update = async (req, res) => {
  const { id } = req.params
  const {
    nome,
    horario,
    duracao,
    publico_alvo,
    valor_inscricao,
    data,
    lotacao,
    promotor,
    tema,
    afiliacao,
    objetivo,
    numero_sessao,
    Atividades_TIPO,
    fk_Evento_id,
    artigos,
  } = req.body

  const atividades = await getById(id, [
    {
      model: Apresentado,
      as: 'apresentados',
    },
  ])

  verifyIfExists(res, atividades, 'atividades')

  await destroyApresentadoRelations(atividades.apresentados)

  await createApresentadoRelations(atividades.id, artigos)

  await atividades.update({
    nome,
    horario,
    duracao,
    publico_alvo,
    valor_inscricao,
    data,
    lotacao,
    promotor,
    tema,
    afiliacao,
    objetivo,
    numero_sessao,
    Atividades_TIPO,
    fk_Evento_id,
  })

  res.redirect('/atividades')
}

const remove = async (req, res) => {
  const { id } = req.params

  const atividades = await getById(id, [
    {
      model: Apresentado,
      as: 'apresentados',
    },
  ])

  verifyIfExists(res, atividades, 'atividades')

  await destroyApresentadoRelations(atividades.apresentados)

  await atividades.destroy()

  res.redirect('/atividades')
}

module.exports = {
  create,
  save,
  edit,
  remove,
  list,
  update,
}
