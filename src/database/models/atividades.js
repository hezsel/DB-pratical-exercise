const {
  INTEGER,
  STRING,
  DATE,
  TIME,
  FLOAT,
} = require('sequelize')

module.exports = {
  createModel(sequelize) {
    const Atividades = sequelize.define('Atividades', {
      id: {
        type: INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      nome: {
        type: STRING,
        allowNull: true,
      },
      horario: {
        type: TIME,
        allowNull: true,
      },
      duracao: {
        type: TIME,
        allowNull: true,
      },
      publico_alvo: {
        type: STRING,
        allowNull: true,
      },
      valor_inscricao: {
        type: FLOAT,
        allowNull: true,
      },
      data: {
        type: DATE,
        allowNull: true,
      },
      promotor: {
        type: STRING,
        allowNull: true,
      },
      lotacao: {
        type: INTEGER,
        allowNull: true,
      },
      tema: {
        type: STRING,
        allowNull: true,
      },
      afiliacao: {
        type: STRING,
        allowNull: true,
      },
      objetivo: {
        type: STRING,
        allowNull: true,
      },
      numero_sessao: {
        type: STRING,
        allowNull: true,
      },
      Atividades_TIPO: {
        type: STRING,
        allowNull: true,
      },
      fk_Evento_id: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'Evento',
          key: 'id',
        },
      },
    }, {
      timestamps: false
    })

    return Atividades
  },
  associateModels(Atividades, {
    Evento,
    Apresentado,
  }) {
    Atividades.belongsTo(Evento, {
      foreignKey: 'fk_Evento_id',
      as: 'evento',
    })
    Atividades.hasMany(Apresentado, {
      foreignKey: 'fk_Atividades_id',
      as: 'apresentados',
    })
  },
}
