import Sequelize from 'sequelize'
import connection from '../config/sequelize-config.js'

const Sanitario = connection.define('sanitario', {
    tipoSanitario: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nomeTratamento: {
        type: Sequelize.STRING,
        allowNull: false
    },
    loteMedicamento: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dataAplicacao: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    dataRetorno : {
        type: Sequelize.DATEONLY,
        allowNull: false
    }
})

Sanitario.sync({ force: false })

export default Sanitario