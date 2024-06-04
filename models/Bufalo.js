import Sequelize from 'sequelize'
import connection from '../config/sequelize-config.js'

const Bufalo = connection.define('bufalos', {
    tag: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    valorArroba: {
        type: Sequelize.FLOAT,
        allowNull: false,
        unique: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    idade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    peso: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    raca: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sexo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dataNascimento: {
        type: Sequelize.DATE,
        allowNull: false
    }
})

Bufalo.sync({ force: false })

export default Bufalo;