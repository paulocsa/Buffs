import express from 'express'
const router = express.Router()
import Bufalo from '../models/Bufalo.js'
import Auth from '../middleware/Auth.js'

router.get('/reproducao', Auth, (req, res) =>{
    res.render('reproducao')
})

export default router