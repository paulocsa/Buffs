// Importando o Sequelize
import Sequelize from "sequelize"

// Criando os dados de conexão com o banco
const connection = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '',
    database: 'buffs',
    timezone: "-03:00"
})

export default connection