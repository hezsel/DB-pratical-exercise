const { Paciente, Medico, Agenda, Consulta } = require('../database')
const { Op } = require('sequelize')

const TODAY = new Date().toISOString().split('T')[0]

const chooseParticipants = async (req, res) => {
  const pacientes = await Paciente.findAll()
  const profissionais = await Medico.findAll()

  res.render('consulta/create', {
    pacientes,
    profissionais,
  })
}

const getSlotsFromAgenda = (agenda, data) => {
  const {
    hora_inicio,
    hora_fim,
    intervalo,
  } = agenda

  const slots = []

  const start = new Date(data + ' ' + hora_inicio)
  const end = new Date(data + ' ' + hora_fim)
  const interval = intervalo * 60 * 1000

  let current = new Date(start)
  while (current < end) {
    slots.push(current.toISOString().split('T')[1].slice(0, 5))
    current = new Date(current.getTime() + interval)
  }

  return slots
}

const removeOcupiedSlots = (slots, consultas) => {
  const slotsOcupados = consultas.map(consulta => consulta.horario)
  return slots.filter(slot => !slotsOcupados.includes(slot))
}

const getTime = async (req, res) => {
  const {
    paciente,
    profissional,
    data = TODAY,
  } = req.query

  const agenda = await Agenda.findOne({
    where: {
      crm_medico: profissional,
      data_inicio: {
        [Op.lte]: data,
      },
      data_fim: {
        [Op.gte]: data,
      },
    },
  })

  if (!agenda) {
    res.render('consulta/choose-date', {
      paciente,
      profissional,
      data,
      slots: null,
    })
  }

  const consultas = await Consulta.findAll({
    where: {
      crm_medico: profissional,
      data: data,
    },
  })

  const slots = getSlotsFromAgenda(agenda, data)

  if (!consultas) {
    res.render('consulta/choose-date', {
      paciente,
      profissional,
      data,
      slots,
    })
  }

  const availableSlots = removeOcupiedSlots(slots, consultas)
  res.render('consulta/choose-date', {
    paciente,
    profissional,
    data,
    slots: availableSlots,
  })
}

const confirm = async (req, res) => {
  const {
    paciente,
    profissional,
    data,
    slot,
  } = req.body

  await Consulta.create({
    crm_medico: profissional,
    cpf_paciente: paciente,
    data,
    horario: slot,
  })

  res.redirect('/consulta?data=' + data + '&profissional=' + profissional)

}

const list = async (req, res) => {
  const profissionais = await Medico.findAll()

  const {
    data = TODAY,
    crm_medico = profissionais[0].crm,
  } = req.query

  const consultas = await Consulta.findAll({
    where: {
      data,
      crm_medico,
    },
    include: [{
      model: Paciente,
      as: 'paciente',
    }],
    order: [['horario', 'ASC']],
  })

  res.render('consulta', {
    consultas,
    profissionais,
    data,
    crm_medico,
  })
}

const finalize = async (req, res) => {
  const consulta = await Consulta.findOne({
    where: {
      id_consulta: req.body.id_consulta,
    }
  })

  await consulta.update({
    realizada: true,
  })

  req.query = req.body

  return list(req, res)
}

const cancel = async (req, res) => {
  const consulta = await Consulta.findOne({
    where: {
      id_consulta: req.body.id_consulta,
    }
  })

  await consulta.destroy()

  req.query = req.body

  return list(req, res)
}

module.exports = {
  chooseParticipants,
  getTime,
  confirm,
  list,
  finalize,
  cancel,
}
