const { Paciente } = require('../database')
const verifyIfExists = require('./utils/verifyIfExists')

const getByCPF = (cpf) => Paciente.findOne({
  where: {
    cpf,
  }
})

const list = async (req, res) => {
  const pacientes = await Paciente.findAll()

  res.render('paciente/index', {
    pacientes,
  })
}

const create = (req, res) => {
  res.render('paciente/create')
}

const save = async (req, res) => {
  const {
    cpf,
    nome,
    sexo,
    data_de_nascimento,
    endereco,
    telefone,
  } = req.body

  const paciente = await Paciente.create({
    cpf,
    nome,
    sexo,
    data_de_nascimento,
    endereco,
    telefone,
  })

  verifyIfExists(res, paciente, 'paciente')

  res.redirect('/paciente')
}

const edit = async (req, res) => {
  const { cpf } = req.params

  const paciente = await getByCPF(cpf)

  verifyIfExists(res, paciente, 'paciente')

  res.render('paciente/edit', {
    paciente,
  })
}

const update = async (req, res) => {
  const { cpf } = req.params
  const {
    nome,
    sexo,
    data_de_nascimento,
    endereco,
    telefone,
  } = req.body

  const paciente = await getByCPF(cpf)

  verifyIfExists(res, paciente, 'paciente')

  await paciente.update({
    nome,
    sexo,
    data_de_nascimento,
    endereco,
    telefone,
  })

  res.redirect('/paciente')
}

const remove = async (req, res) => {
  const { cpf } = req.params

  const paciente = await getByCPF(cpf)

  verifyIfExists(res, paciente, 'paciente')

  await paciente.destroy()

  res.redirect('/paciente')
}

module.exports = {
  create,
  save,
  edit,
  remove,
  list,
  update,
}
