const {
  STRING,
} = require('sequelize')

module.exports = {
  createModel(sequelize) {
    const Medico = sequelize.define('Medico', {
      crm: {
        type: STRING,
        primaryKey: true,
      },
      nome: {
        type: STRING,
        allowNull: false,
      },
      telefone: {
        type: STRING,
        allowNull: true,
      },
    }, {
      timestamps: false
    })

    return Medico
  },
  associateModels(Medico, {
    Consulta,
  }) {
    Medico.hasMany(Consulta, {
      foreignKey: 'crm_medico',
      as: 'consultas',
    })
  },
}
