import express from 'express'
const router = express.Router()
import Demanda from '../models/Demanda.js'
import Funcionario from '../models/Funcionario.js'

// Rota para listar as demandas dos funcionários
router.get('/demandas', async (req, res) => {
    try {
        const demandas = await Demanda.findAll({ include: Funcionario })
        const funcionarios = await Funcionario.findAll()
        res.render('demandas', { demandas, funcionarios })
    } catch (err) {
        req.flash('danger', 'Erro ao listar as Demandas.')
        res.redirect('/')
    }
})

// Rota para criar uma nova demanda
router.post('/createDemanda', async (req, res) => {
    const { dataInicio, dataTermino, tipoServico, funcionarioId } = req.body

    try {
        await Demanda.create({ dataInicio, dataTermino, tipoServico, funcionarioId })
        req.flash('success', 'Demanda criada com sucesso!')
        res.redirect('/demandas')
    } catch (err) {
        req.flash('danger', 'Erro ao definir demanda ao funcionário.')
        res.redirect('/demandas')
    }
})

// Rota para exibir o formulário de edição de demanda
router.get('/editDemanda/:id', async (req, res) => {
    const { id } = req.params
    try {
        const demanda = await Demanda.findByPk(id)
        const funcionarios = await Funcionario.findAll()
        if (demanda) {
            res.render('editDemanda', { demanda, funcionarios })
        } else {
            req.flash('danger', 'Demanda não encontrada.')
            res.redirect('/demandas')
        }
    } catch (err) {
        req.flash('danger', 'Erro ao buscar demanda.')
        res.redirect('/demandas')
    }
})

// Rota para atualizar uma demanda
router.post('/updateDemanda/:id', async (req, res) => {
    const { id } = req.params
    const { dataInicio, dataTermino, tipoServico, funcionarioId } = req.body

    try {
        const result = await Demanda.update({ dataInicio, dataTermino, tipoServico, funcionarioId }, { where: { id } })
        if (result[0] > 0) {
            req.flash('success', 'Demanda atualizada com sucesso!')
            res.redirect('/demandas')
        } else {
            req.flash('danger', 'Erro ao atualizar demanda.')
            res.redirect('/demandas/' + id)
        }
    } catch (err) {
        req.flash('danger', 'Erro ao atualizar demanda.')
        res.redirect('/demandas/' + id)
    }
})

// Rota para deletar uma demanda
router.post('/deleteDemanda/:id', async (req, res) => {
    const { id } = req.params

    try {
        const result = await Demanda.destroy({ where: { id } })
        if (result > 0) {
            req.flash('success', 'Demanda deletada com sucesso!')
            res.redirect('/demandas')
        } else {
            req.flash('danger', 'Erro ao excluir demanda.')
            res.redirect('/demandas')
        }
    } catch (err) {
        req.flash('danger', 'Erro ao excluir demanda.')
        res.redirect('/demandas')
    }
})

export default router
