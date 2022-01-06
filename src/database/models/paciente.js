const {
  STRING,
  DATE,
} = require('sequelize')

module.exports = {
  createModel(sequelize) {
    const Paciente = sequelize.define('Paciente', {
      cpf: {
        type: STRING,
        primaryKey: true,
      },
      nome: {
        type: STRING,
        allowNull: false,
      },
      sexo: {
        type: STRING,
        allowNull: false,
      },
      data_de_nascimento: {
        type: DATE,
        allowNull: true,
      },
      endereco: {
        type: STRING,
        allowNull: true,
      },
      telefone: {
        type: STRING,
        allowNull: true,
      },
    }, {
      timestamps: false
    })

    return Paciente
  },
  associateModels(Paciente, {
    Consulta,
  }) {
    Paciente.hasMany(Consulta, {
      foreignKey: 'cpf_paciente',
      as: 'consultas',
    })
  },
}
