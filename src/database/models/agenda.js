const {
  STRING,
  INTEGER,
  DATE,
} = require('sequelize')

module.exports = {
  createModel(sequelize) {
    const Agenda = sequelize.define('Agenda', {
      id_agenda: {
        type: STRING,
        primaryKey: true,
      },
      crm_medico: {
        type: STRING,
        allowNull: false,
        references: {
          model: 'Medico',
          key: 'crm',
        },
      },
      data_inicio: {
        type: DATE,
        allowNull: true,
      },
      data_fim: {
        type: DATE,
        allowNull: true,
      },
      intervalo: {
        type: INTEGER,
        allowNull: true,
      },
      hora_inicio: {
        type: DATE,
        allowNull: true,
      },
      hora_fim: {
        type: DATE,
        allowNull: true,
      },
    }, {
      timestamps: false
    })

    return Agenda
  },
  associateModels(Agenda, {
    Medico,
  }) {
    Agenda.belongsTo(Medico, {
      foreignKey: 'crm_medico',
      as: 'medico',
    })
  },
}
