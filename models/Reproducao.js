import Sequelize from 'sequelize'
import connection from '../config/sequelize-config.js'

const Reproducao = connection.define('reproducao', {
    tag: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    taxaConcepcao: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    intervaloReproducao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    numeroReproducao: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    observacaoParto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tipoInseminacao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ultimaInseminacao: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    dataParto: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    bufalasGestantes: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    bufalasEmGestacao: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    bufalasAptasInseminacao: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    
})

Reproducao.sync({ force: false })

export default Reproducao