import express from 'express';
const router = express.Router();
import User from "../models/Funcionario.js"
import { where } from 'sequelize'

router.get("/usuCadastrados", (req, res) => {
    res.render('usuCadastrados')
})
router.get("/usuCadastrar", (req, res) => {
    res.render('usuCadastrar')
})

export default router;