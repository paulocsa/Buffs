// Imports e Configurações
import express from 'express'
import session from 'express-session'
import flash from 'express-flash'

import connection from './config/sequelize-config.js'
import UsersController from './controllers/UsersController.js'
import BufalosController from './controllers/BufalosController.js'
import FuncionariosController from './controllers/FuncionariosController.js'
import Auth from './middleware/Auth.js'

const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))

// Conexão com o Banco de Dados
connection.authenticate().then(() => {
    console.log('Conexão com o banco de dados feita com sucesso!')
}).catch((error) => {
    console.log(error)
})

connection.query('CREATE DATABASE IF NOT EXISTS buffs').then(() => {
    console.log('O banco de dados está criado.')
}).catch((error) => {
    console.log(error)
})

// Middlewares
app.use(session({
    secret: 'buffssecret',
    cookie: { maxAge: 3000000 }, // sessão expira em 1h
    saveUninitialized: false, // se o usuario tentar logar no sistema ele nao vai inicializar a nova sessão
    resave: false
}))

app.use(flash())

// Rotas
app.use('/', UsersController)
app.use('/', BufalosController)
app.use('/', FuncionariosController)

// Rota Inicial com Autenticação
app.get('/', Auth, (req, res) => {
    res.render('index')
})

// Inicialização do Servidor
app.listen(8080, (erro) => {
    if (erro) {
        console.log('Ocorreu um erro!')
    } else {
        console.log('Servidor iniciado com sucesso!')
    }
})
