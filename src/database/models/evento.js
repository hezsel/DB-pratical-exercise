const {
  INTEGER,
  STRING,
  DATE,
} = require('sequelize')

module.exports = {
  createModel(sequelize) {
    const Evento = sequelize.define('Evento', {
      id: {
        type: INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      nome: {
        type: STRING,
        allowNull: false,
      },
      publico_alvo: {
        type: STRING,
        allowNull: false,
      },
      numEdicao: {
        type: STRING,
        allowNull: false,
      },
      data: {
        type: DATE,
        allowNull: false,
      },
      tema: {
        type: STRING,
        allowNull: false,
      },
      descricao: {
        type: STRING,
        allowNull: false,
      },
    }, {
      timestamps: false
    })

    return Evento
  },
  associateModels(Evento, {
    Atividades,
  }) {
    Evento.hasMany(Atividades, {
      foreignKey: 'fk_Evento_id',
      as: 'atividades',
    })
  },
}
