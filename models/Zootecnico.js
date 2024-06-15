import Sequelize from 'sequelize'
import connection from '../config/sequelize-config.js'

const Zootecnico = connection.define('zootecnico', {
    tag: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    comprimentoCorporal: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    circunferenciaCorporal: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    alturaCernelha: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    suplementacao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tipoRacao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tipoPastagem: {
        type: Sequelize.STRING,
        allowNull: false
    }
})


Zootecnico.sync({ force: false })

export default Zootecnico;