import express from 'express'
const router = express.Router()
import Demanda from '../models/Demanda.js'
import Funcionario from '../models/Funcionario.js'

import { where } from 'sequelize'

router.get('/demandas', (req, res) => {
    const funcionariosPromise = Funcionario.findAll()
    Promise.all([funcionariosPromise])
        .then(([funcionarios]) => {
            // Renderizar o template 'demandas' passando todos os dados necessários
            res.render('demandas', {
                funcionarios: funcionarios
            })
        })
})

//criar nova demanda
router.post('/createDemanda', (req, res) =>{
    const {dataInicio, dataTermino, tipoServico} = req.body

    Demanda.create({
        dataInicio,
        dataTermino,
        tipoServico
    }).then(() => {
        req.flash('success', 'Demanda cadastrada com sucesso!')
        return res.redirect('/demandas')
    }).catch(err => {
        req.flash('danger', 'Erro ao cadastrar demanda.')
        return res.redirect('/demandas')
    })
})

// Rota para exibir o formulário de edição de demanda
router.get('/editDemanda/:id', (req, res) => {
    const { id } = req.params
    Demanda.findByPk(id).then(demanda => {
        if (demanda) {
            res.render('editDemanda', { demanda })
        } else {
            req.flash('danger', 'Demanda não encontrada.')
            res.redirect('/demandas')
        }
    }).catch(err => {
        req.flash('danger', 'Erro ao buscar demanda.')
        res.redirect('/demandas')
    })
})

//rota para atualizar uma demanda
router.post('//updateDemanda/:id', (req, res) =>{
    const { id } = req.params
    const {dataInicio, dataTermino, tipoServico} = req.body

    Demanda.update({
        dataInicio,
        dataTermino,
        tipoServico
    }, {
        where : { id }
    }).then(result => {
        if (result[0] > 0) {
            req.flash('success', 'Demanda atualizada com sucesso!')
            res.redirect('/demandas')
        } else {
            req.flash('danger', 'Erro ao atualizar demanda.')
            res.redirect('/demandas/' + id)
        }
    }).catch(err => {
        req.flash('danger', 'Erro ao atualizar demandas.')
        res.redirect('/demandas/' + id)
    })
})

// Rota para deletar uma demanda
router.post('/deleteDemanda/:id', (req, res) => {
    const { id } = req.params

    Demanda.destroy({
        where: { id }
    }).then(result => {
        if (result > 0) {
            req.flash('success', 'Demanda excluída com sucesso!')
            res.redirect('/demandas')
        } else {
            req.flash('danger', 'Erro ao excluir demanda.')
            res.redirect('/demandas')
        }
    }).catch(err => {
        req.flash('danger', 'Erro ao excluir demanda.')
        res.redirect('/demandas')
    })
})


export default router
