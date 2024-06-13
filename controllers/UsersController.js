import express from 'express'
const router = express.Router()
import User from "../models/User.js"
import bcrypt from 'bcrypt'
import { where } from 'sequelize'
import Cookies from 'js-cookie'

router.get("/login", (req, res) => {
    res.render('login', {
        loggedOut: true,
        messages: req.flash()
    })
})

router.get("/cadastro", (req, res) => {
    res.render('cadastro', {
        loggedOut: true,
        messages: req.flash()
    })
})

router.post("/createUser", (req, res) => {
    const { name, email, password, confirmPassword } = req.body

    if (password !== confirmPassword) {
        req.flash('danger', 'As senhas não coincidem.')
        return res.redirect('/cadastro')
    }

    // Verificando se o usuário já está cadastrado
    User.findOne({ where: { email } }).then(user => {
        if (user == undefined) {
            // Cadastro
            const salt = bcrypt.genSaltSync(10) // Quantidade do hash
            const hash = bcrypt.hashSync(password, salt)
            // Criar o usuário com hash
            User.create({
                name,
                email,
                password: hash
            }).then(() => {
                req.flash('success', 'Usuário cadastrado com sucesso! Faça o login.')
                return res.redirect('/login')
            }).catch(err => {
                req.flash('danger', 'Erro ao cadastrar usuário.')
                return res.redirect('/cadastro')
            })
        } else {
            req.flash('danger', 'Usuário já possui cadastro, faça o login.')
            return res.redirect('/cadastro')
        }
    }).catch(err => {
        req.flash('danger', 'Erro ao verificar usuário.')
        return res.redirect('/cadastro')
    })
})

// Rota de Autenticação do Usuario
router.post("/authenticate", (req, res) => {
    const { email, password } = req.body
    // Busca o Usuario no Banco
    User.findOne({ where: { email } }).then(user => {
        // Se o Usuario Exisitir
        if (user != undefined) {
            //Valida a senha
            const correct = bcrypt.compareSync(password, user.password)
            //Se a Senha for Valida
            if (correct) {

                //Autoriza o login - posteriormente aq sera criado a sessão
                req.session.user = {
                    id: user.id,
                    email: user.email,
                }

                //Criando uma flash message
                req.flash('success', 'Login efetuado com sucesso!')

                // Enviar apenas uma resposta
                return res.redirect('/') // Redireciona para a página inicial ou outra página apropriada

            } else {
                req.flash('danger', 'Senha incorreta! Tente novamente.')
                return res.redirect('/login')
            }
        } else {
            req.flash('danger', 'Usuário não cadastrado!')
            return res.redirect('/login')
        }
    }).catch(err => {
        req.flash('danger', 'Erro ao buscar usuário.')
        return res.redirect('/login')
    })
})

// Rota logout
router.get("/logout", (req, res) => {
    req.session.user = undefined
    res.redirect('/')
})

export default router
