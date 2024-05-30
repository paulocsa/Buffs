import express from 'express';
const router = express.Router();
import User from "../models/Bufalo.js"
import { where } from 'sequelize'

router.get("/rebanho", (req, res) => {
    res.render('rebanho')
})

router.get("/zootecnico", (req, res) => {
    res.render('/zootecnico')
})

router.get("/sanitario", (req, res) => {
    res.render('/sanitario')
})

router.post("/createBufalo", (req, res) => {
    const { id, valorArroba, nome, idade, peso, raca, sexo, dataNascimento } = req.body
    if (password !== confirmPassword) {
        req.flash('danger', 'As senhas não coincidem.')
        res.redirect('/cadastroBufalo')
        return
    }

     // Verificando se o usuário já está cadastrado
     User.findOne({ where: { tag } }).then(bufalo => {
        if (bufalo == undefined) {
            // Cadastro
            User.create({
                tag,
                nome
            }).then(() => {
                req.flash('success', 'Búfalo cadastrado com sucesso! ')
                res.redirect('/rebanho')
            }).catch(err => {
                req.flash('danger', 'Erro ao cadastrar búfalo.')
                res.redirect('/cadastroBufalo')
            })
        } else {
            req.flash('danger', 'Búfalo já possui cadastro.')
            res.redirect('/cadastroBufalo')
        }
    }).catch(err => {
        req.flash('danger', 'Erro ao verificar búfalo.')
        res.redirect('/cadastroBufalo')
    })
})


export default router;