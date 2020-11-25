const Sequelize = require('sequelize')
const models = require('./models')

const databaseConfig = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  logging: console.log,
  seederStorage: 'sequelize',
  url: process.env.DATABASE_URL,
}

const {
  database,
  username,
  password,
  url,
} = databaseConfig

const sequelize = new Sequelize(
  ...(url ? [url] : [database, username, password]),
  {
    ...databaseConfig,
    define: {
      freezeTableName: true,
    },
  },
)

sequelize.authenticate()
  .then(() => console.log('conectado ao banco de dados'))
  .catch((err) => console.log('falha ao se conectar ao banco de dados', err))


const createModels = (models) => {
  const createdModels = {}
  for (const modelName in models) {
    const model = models[modelName]
    createdModels[modelName] = {
      model,
      instance: model.createModel(sequelize)
    }
  }
  return createdModels
}

const associateModels = (alreadyCreatedModels) => {
  for (const modelName in alreadyCreatedModels) {
    const { model, instance } = alreadyCreatedModels[modelName]
    if (model.associateModels) {
      model.associateModels(instance, sequelize.models)
    }
  }
}

associateModels(createModels(models))

const db = {
  ...sequelize.models,
  sequelize,
}

module.exports = db
