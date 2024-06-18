// Imports e Configurações
import express from 'express'
import session from 'express-session'
import flash from 'express-flash'


import connection from './config/sequelize-config.js'
import UsersController from './controllers/UsersController.js'
import BufalosController from './controllers/BufalosController.js'
import ZootecnicoController from './controllers/ZootecnicoController.js'
import ReproducaoController from './controllers/ReproducaoController.js'
import SanitarioController from './controllers/SanitarioController.js'
import FuncionariosController from './controllers/FuncionariosController.js' 
import DemandasController from './controllers/DemandasController.js'
import Auth from './middleware/Auth.js'
import Funcionario from './models/Funcionario.js'
import Bufalo from './models/Bufalo.js'
import Zootecnico from './models/Zootecnico.js'

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
    cookie: { maxAge: 30000000 }, // sessão expira em 1h
    saveUninitialized: false, // se o usuario tentar logar no sistema ele nao vai inicializar a nova sessão
    resave: false
}))

app.use(flash())

// Rotas
app.use('/', UsersController)
app.use('/', BufalosController)
app.use('/', ZootecnicoController)
app.use('/', SanitarioController)
app.use('/', FuncionariosController)
app.use('/', DemandasController)
app.use('/', ReproducaoController)
app.use('/', SanitarioController)



// Rota Inicial com Autenticação
app.get('/', Auth, (req, res) => {
    //Define os dados da tabela funcionarios
    const funcionariosPromise = Funcionario.findAll(); // Buscar todos os funcionários
    const ultimoFuncionarioPromise = Funcionario.findOne({ order: [['id', 'DESC']] }); //Busca o Ultimo funcionário
    //Define os dados da tabela bufalos
    const bufalosPromise = Bufalo.findAll();// Buscar todos os búfalos 
    const ultimoBufaloPromise = Bufalo.findOne({ order: [['id', 'DESC']] }); //Busca o ultimo Bufalo
    const user = req.session.user //Defino o nome do usuario que iniciou a sessão, de acordo com seu cadastro

    // Utiliza Promisse para executar as operações em paralelo
    Promise.all([funcionariosPromise, ultimoFuncionarioPromise, bufalosPromise, ultimoBufaloPromise])
        .then(([funcionarios, ultimoFuncionario, bufalos, ultimoBufalo]) => {
            const ultimoId = ultimoFuncionario ? ultimoFuncionario.id : null;
            const ultimoBufaloId = ultimoBufalo ? ultimoBufalo.id : null;

            // Renderizar o template 'index' passando todos os dados necessários
            res.render('index', {
                funcionarios: funcionarios,
                ultimoId: ultimoId,
                bufalos: bufalos,
                ultimoBufaloId: ultimoBufaloId,
                user: user.name

            });
        })
        .catch(error => {
            console.error('Erro ao buscar os dados:', error);
            res.status(500).send('Erro no servidor');
        });
});



// Inicialização do Servidor
app.listen(8080, (erro) => {
    if (erro) {
        console.log('Ocorreu um erro!')
    } else {
        console.log('Servidor iniciado com sucesso!')
    }
})
