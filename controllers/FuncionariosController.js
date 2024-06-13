import express from 'express'
const router = express.Router()
import Funcionario from '../models/Funcionario.js'

// Rota para listar todos os funcionários
router.get('/funcionarios', (req, res) => {
    res.render('funcionarios')
})




// Rota para exibir o formulário de criação de funcionário
router.get('/usuCadastrar', (req, res) => {
    res.render('usuCadastrar')
})

// Rota para criar um novo funcionário
router.post('/createFuncionario', (req, res) => {
    const { nome, cpf, email, telefone, rua, numero, bairro, cidade, estado, cargo, dataNascimento, cargaHoraria, genero, descricaoAcoes } = req.body

    Funcionario.create({
        nome,
        cpf,
        email,
        telefone,
        rua,
        numero,
        bairro,
        cidade,
        estado,
        cargo,
        dataNascimento,
        cargaHoraria,
        genero,
        descricaoAcoes
    }).then(() => {
        req.flash('success', 'Funcionário cadastrado com sucesso!')
        return res.redirect('/usuCadastrados')
    }).catch(err => {
        req.flash('danger', 'Erro ao cadastrar funcionário.')
        return res.redirect('/usuCadastrar')
    })
})

// Rota para exibir o formulário de edição de funcionário
router.get('/editFuncionario/:id', (req, res) => {
    const { id } = req.params
    Funcionario.findByPk(id).then(funcionario => {
        if (funcionario) {
            res.render('editFuncionario', { funcionario })
        } else {
            req.flash('danger', 'Funcionário não encontrado.')
            res.redirect('/usuCadastrados')
        }
    }).catch(err => {
        req.flash('danger', 'Erro ao buscar funcionário.')
        res.redirect('/usuCadastrados')
    })
})

// Rota para atualizar um funcionário
router.post('/updateFuncionario/:id', (req, res) => {
    const { id } = req.params
    const { nome, cpf, email, telefone, rua, numero, bairro, cidade, estado, cargo, dataNascimento, cargaHoraria, genero, descricaoAcoes } = req.body

    Funcionario.update({
        nome,
        cpf,
        email,
        telefone,
        rua,
        numero,
        bairro,
        cidade,
        estado,
        cargo,
        dataNascimento,
        cargaHoraria,
        genero,
        descricaoAcoes
    }, {
        where: { id }
    }).then(result => {
        if (result[0] > 0) {
            req.flash('success', 'Funcionário atualizado com sucesso!')
            res.redirect('/usuCadastrados')
        } else {
            req.flash('danger', 'Erro ao atualizar funcionário.')
            res.redirect('/editFuncionario/' + id)
        }
    }).catch(err => {
        req.flash('danger', 'Erro ao atualizar funcionário.')
        res.redirect('/editFuncionario/' + id)
    })
})

// Rota para deletar um funcionário
router.post('/deleteFuncionario/:id', (req, res) => {
    const { id } = req.params

    Funcionario.destroy({
        where: { id }
    }).then(result => {
        if (result > 0) {
            req.flash('success', 'Funcionário deletado com sucesso!')
            res.redirect('/usuCadastrados')
        } else {
            req.flash('danger', 'Erro ao deletar funcionário.')
            res.redirect('/usuCadastrados')
        }
    }).catch(err => {
        req.flash('danger', 'Erro ao deletar funcionário.')
        res.redirect('/usuCadastrados')
    })
})

export default router