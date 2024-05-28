import express from 'express'
const router = express.Router()
import User from "../models/User.js"
import bcrypt from 'bcrypt'
import { where } from 'sequelize'

router.get("/login", (req, res) => {
    res.render('login'), {
        loggedOut: true,
        messages: req.flash()
    }
})

router.get("/cadastro", (req, res) => {
    res.render('cadastro'), {
        loggedOut: true,
        messages: req.flash()
    }
})

router.post("/createUser", (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword

    if (password !== confirmPassword) {
        res.send('As senhas não coincidem. <br> <a href="/cadastro">Tente novamente.</a>')
        return
    }

    // Verificando se o usuário já está cadastrado
    User.findOne({ where: { email: email } }).then(user => {
        if (user == undefined) {
            // Cadastro
            const salt = bcrypt.genSaltSync(10) // Quantidade do hash
            const hash = bcrypt.hashSync(password, salt)
            // Criar o usuário com hash
            User.create({
                name: name,
                email: email,
                password: hash
            }).then(() => {
                res.redirect("/login")
            })
        } else {
            req.flash('danger', 'Usuário já possui cadastro, faça o login.')
           res.redirect("/cadastro")
        }
    })
})

// Rota de Autenticação do Usuario
router.post("/authenticate", (req, res) => {
    const email = req.body.email
    const password = req.body.password
    // Busca o Usuario no Banco
    User.findOne({ where: { email: email } }).then(user => {
        // Se o Usuario Exisitir
        if (user != undefined) {
            //Valida a senha
            const correct = bcrypt.compareSync(password, user.password)
            //Se a Senha for Valida
            if (correct) {
                //Autoriza o login - posteriormente aq sera criado a sessão
                req.session.user = {
                    id: user.id,
                    email: user.email
                }

                //Criando uma flash message
                req.flash('success', 'Login efetuado com sucesso!')

                //res.redirect("/")
                res.send(`Usuário logado: <br> ID: ${req.session.user['id']} <br> email: ${req.session.user['email']}`)
                //Se a senha não for valida
                res.redirect("/");
            } else {
                req.flash('danger', 'Senha incorreta! Tente novamente.')
                res.redirect("/login")
            }
        } else {
            req.flash('danger', 'Usuário não cadastrado!')
            res.redirect("/login")
        }
    })
})

export default router
