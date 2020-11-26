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
      horario: {
        type: TIME,
        allowNull: false,
      },
      duracao: {
        type: TIME,
        allowNull: false,
      },
      publico_alvo: {
        type: STRING,
        allowNull: false,
      },
      valor_inscricao: {
        type: FLOAT,
        allowNull: false,
      },
      data: {
        type: DATE,
        allowNull: false,
      },
      promotor: {
        type: STRING,
        allowNull: false,
      },
      lotacao: {
        type: STRING,
        allowNull: false,
      },
      nome: {
        type: STRING,
        allowNull: false,
      },
      tema: {
        type: STRING,
        allowNull: false,
      },
      afiliacao: {
        type: STRING,
        allowNull: false,
      },
      minicurriculo: {
        type: STRING,
        allowNull: false,
      },
      objetivo: {
        type: STRING,
        allowNull: false,
      },
      nivel: {
        type: STRING,
        allowNull: false,
      },
      nome_sessao: {
        type: STRING,
        allowNull: false,
      },
      tipo: {
        type: STRING,
        allowNull: false,
      },
      numero_sessao: {
        type: STRING,
        allowNull: false,
      },
      Atividade_TIPO: {
        type: STRING,
        allowNull: false,
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
  }) {
    Atividades.belongsTo(Evento, {
      foreignKey: 'fk_Evento_id',
      as: 'evento',
    })
  },
}
