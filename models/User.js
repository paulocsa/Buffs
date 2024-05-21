import Sequelize from 'sequelize'
import connection from '../config/sequelize-config.js'

const User = connection.define('users', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true 
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

User.sync({ force: false })

export default User;
