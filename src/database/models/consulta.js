const cuid = require('cuid')
const {
  INTEGER,
  STRING,
  DATE,
  BOOLEAN,
} = require('sequelize')

module.exports = {
  createModel(sequelize) {
    const Consulta = sequelize.define('Consulta', {
      id_consulta: {
        type: INTEGER,
        primaryKey: true,
        defaultValue: cuid,
      },
      realizada: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      cpf_paciente: {
        type: STRING,
        allowNull: false,
        references: {
          model: 'Paciente',
          key: 'cpf',
        },
      },
      crm_medico: {
        type: STRING,
        allowNull: false,
        references: {
          model: 'Medico',
          key: 'crm',
        },
      },
      data: {
        type: DATE,
        allowNull: false,
      },
      horario: {
        type: STRING,
        allowNull: true,
      },
    }, {
      timestamps: false
    })

    return Consulta
  },
  associateModels(Consulta, {
    Paciente,
    Medico,
  }) {
    Consulta.belongsTo(Paciente, {
      foreignKey: 'cpf_paciente',
      as: 'paciente',
    })
    Consulta.belongsTo(Medico, {
      foreignKey: 'crm_medico',
      as: 'medico',
    })
  },
}
