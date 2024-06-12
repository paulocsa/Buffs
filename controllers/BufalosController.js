import express from 'express'
const router = express.Router()
import Bufalo from '../models/Bufalo.js'
import { where } from 'sequelize'

// Rota para listar todos os búfalos
router.get('/bufalos', (req, res) => {
res.render('bufalos')
})

// Rota para exibir o formulário de criação de búfalo
router.get('/cadastroBufalo', (req, res) => {
    res.render('cadastroBufalo')
})

// Rota para criar um novo búfalo
router.post('/createBufalo', (req, res) => {
    const { id, tag, valorArroba, nome, idade, peso, raca, sexo, dataNascimento } = req.body

    // Verificando se o búfalo já está cadastrado
    Bufalo.findOne({ where: { tag } }).then(bufalo => {
        if (bufalo == undefined) {
            // Cadastro
            Bufalo.create({
                tag,
                valorArroba,
                nome,
                idade,
                peso,
                raca,
                sexo,
                dataNascimento
            }).then(() => {
                req.flash('success', 'Búfalo cadastrado com sucesso!')
                return res.redirect('/rebanho')
            }).catch(err => {
                req.flash('danger', 'Erro ao cadastrar búfalo.')
                return res.redirect('/cadastroBufalo')
            })
        } else {
            req.flash('danger', 'Búfalo já possui cadastro.')
            return res.redirect('/cadastroBufalo')
        }
    }).catch(err => {
        req.flash('danger', 'Erro ao verificar búfalo.')
        return res.redirect('/cadastroBufalo')
    })
})

// Rota para exibir o formulário de edição de búfalo
router.get('/editBufalo/:id', (req, res) => {
    const { id } = req.params
    Bufalo.findByPk(id).then(bufalo => {
        if (bufalo) {
            res.render('editBufalo', { bufalo })
        } else {
            req.flash('danger', 'Búfalo não encontrado.')
            res.redirect('/rebanho')
        }
    }).catch(err => {
        req.flash('danger', 'Erro ao buscar búfalo.')
        res.redirect('/rebanho')
    })
})

// Rota para atualizar um búfalo
router.post('/updateBufalo/:id', (req, res) => {
    const { id } = req.params
    const { tag, valorArroba, nome, idade, peso, raca, sexo, dataNascimento } = req.body

    Bufalo.update({
        tag,
        valorArroba,
        nome,
        idade,
        peso,
        raca,
        sexo,
        dataNascimento
    }, {
        where: { id }
    }).then(result => {
        if (result[0] > 0) {
            req.flash('success', 'Búfalo atualizado com sucesso!')
            res.redirect('/rebanho')
        } else {
            req.flash('danger', 'Erro ao atualizar búfalo.')
            res.redirect('/editBufalo/' + id)
        }
    }).catch(err => {
        req.flash('danger', 'Erro ao atualizar búfalo.')
        res.redirect('/editBufalo/' + id)
    })
})

// Rota para deletar um búfalo
router.post('/deleteBufalo/:id', (req, res) => {
    const { id } = req.params

    Bufalo.destroy({
        where: { id }
    }).then(result => {
        if (result > 0) {
            req.flash('success', 'Búfalo deletado com sucesso!')
            res.redirect('/rebanho')
        } else {
            req.flash('danger', 'Erro ao deletar búfalo.')
            res.redirect('/rebanho')
        }
    }).catch(err => {
        req.flash('danger', 'Erro ao deletar búfalo.')
        res.redirect('/rebanho')
    })
})

export default router