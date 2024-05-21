import express from 'express'
const router = express.Router()
import User from "../models/User.js"
import bcrypt from 'bcrypt'
import { where } from 'sequelize'

router.get("/login", (req, res) => {
    res.render('login')
})

router.get("/cadastro", (req, res) => {
    res.render('cadastro')
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
            res.send(`Usuário já cadastrado! <br> <a href="/login">Tentar novamente.</a>`)
        }
    })
})

export default router
