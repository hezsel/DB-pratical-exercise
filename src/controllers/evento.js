const { Evento, Atividades, Apresentado } = require('../database')
const verifyIfExists = require('./utils/verifyIfExists')

const getById = (id, include) => Evento.findOne({
  where: {
    id,
  },
  include,
})

const list = async (req, res) => {
  const eventos = await Evento.findAll({
    include: [
      {
        model: Atividades,
        as: 'atividades',
      },
    ]
  })

  res.render('evento/index', {
    eventos,
  })
}

const create = (req, res) => {
  res.render('evento/create')
}

const save = async (req, res) => {
  const {
    nome,
    publico_alvo,
    numEdicao,
    data,
    tema,
    descricao,
  } = req.body

  const evento = await Evento.create({
    nome,
    publico_alvo,
    numEdicao,
    data,
    tema,
    descricao,
  })

  verifyIfExists(res, evento, 'evento')

  res.redirect('/evento')
}

const edit = async (req, res) => {
  const { id } = req.params

  const evento = await getById(id)

  verifyIfExists(res, evento, 'evento')

  res.render('evento/edit', {
    evento,
  })
}

const update = async (req, res) => {
  const { id } = req.params
  const {
    nome,
    publico_alvo,
    numEdicao,
    data,
    tema,
    descricao,
  } = req.body

  const evento = await getById(id)

  verifyIfExists(res, evento, 'evento')

  await evento.update({
    nome,
    publico_alvo,
    numEdicao,
    data,
    tema,
    descricao,
  })

  res.redirect('/evento')
}

const remove = async (req, res) => {
  const { id } = req.params

  const evento = await getById(id, [
    {
      model: Atividades,
      as: 'atividades',
      include: [
        {
          model: Apresentado,
          as: 'apresentados',
        },
      ],
    },
  ])

  verifyIfExists(res, evento, 'evento')

  for (const atividade of evento.atividades) {
    for (const apresentado of evento.apresentados) {
      await apresentado.destroy()
    }
    await atividade.destroy()
  }
  await evento.destroy()

  res.redirect('/evento')
}

module.exports = {
  create,
  save,
  edit,
  remove,
  list,
  update,
}
