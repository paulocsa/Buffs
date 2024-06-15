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



export default router
