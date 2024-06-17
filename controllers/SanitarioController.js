import express from 'express'
const router = express.Router()
import Bufalo from '../models/Bufalo.js'
import Auth from '../middleware/Auth.js'

router.get('/sanitario', Auth, (req, res) =>{
    res.render('sanitario')
})

export default router