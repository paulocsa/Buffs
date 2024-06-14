import Sequelize from 'sequelize'
import connection from '../config/sequelize-config.js'

const Demanda = connection.define('demandas', {
    dataInicio: {
        type: Sequelize.DATE,
        allowNull: false
    },
    dataTermino: {
        type: Sequelize.DATE,
        allowNull: false
    },
    tipoServico: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Demanda.sync({ force: false })

export default Demanda
