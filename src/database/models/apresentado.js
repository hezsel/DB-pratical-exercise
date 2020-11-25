const {
  INTEGER,
} = require('sequelize')

module.exports = {
  createModel(sequelize) {
    const Apresentado = sequelize.define('Apresentado', {
      fk_Artigo_id: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'Artigo',
          key: 'id',
        },
      },
      fk_Atividades_id: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'Atividades',
          key: 'id',
        },
      },
    }, {
      timestamps: false
    })

    return Apresentado
  },
  associateModels(Apresentado, {
    Artigo,
    Atividades,
  }) {
    Apresentado.belongsTo(Artigo, {
      foreignKey: 'fk_Artigo_id',
      as: 'artigo',
    })
    Apresentado.belongsTo(Atividades, {
      foreignKey: 'fk_Atividades_id',
      as: 'atividade',
    })
  },
}
