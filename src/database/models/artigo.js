const {
  INTEGER,
  STRING,
  DATE,
} = require('sequelize')

module.exports = {
  createModel(sequelize) {
    const Artigo = sequelize.define('Artigo', {
      id: {
        type: INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      nome: {
        type: STRING,
        allowNull: false,
      },
      resumo: {
        type: STRING,
        allowNull: false,
      },
      autoria: {
        type: STRING,
        allowNull: false,
      },
      data_de_publicao: {
        type: DATE,
        allowNull: false,
      },
    }, {
      timestamps: false
    })

    return Artigo
  },
  associateModels(Artigo, {
    Apresentado,
  }) {
    Artigo.hasMany(Apresentado, {
      foreignKey: 'fk_Artigo_id',
      as: 'artigos',
    })
  },
}
