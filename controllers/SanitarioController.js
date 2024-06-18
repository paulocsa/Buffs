import express from 'express'
const router = express.Router()
import Bufalo from '../models/Bufalo.js'
import Sanitario from '../models/Sanitario.js'

router.get('/sanitario', async (req, res) => {
    try {
        const bufalos = await Bufalo.findAll() // Buscar todos os búfalos cadastrados
        const sanitario = await Sanitario.findAll() //buscar os dados sanitario
        const ultimoBufalo = await Bufalo.findOne({ order: [['id', 'DESC']] }) // Buscar último búfalo cadastrado

        const ultimoBufaloId = ultimoBufalo ? ultimoBufalo.id : null

        // Contagem de búfalos em cada categoria
        const totalBufalos = bufalos.length;

        const contraVerminoses = await Sanitario.count({
            where: {
                nomeTratamento: "Tratamento contra Verminoses",
            }
        })
        const hemoglobinuriaBacilar= await Sanitario.count({
            where: {
                nomeTratamento: "Tratamento da Hemoglobinúria Bacilar"
            }
        })
        const contraBrucelose = await Sanitario.count({
            where: {
                nomeTratamento: "Vacinação contra Brucelose"
            }
        })
        const contraFebreAftosa = await Sanitario.count({
            where: {
                nomeTratamento: "Vacinação contra Febre Aftosa"
            }
        })
        const estomatiteVesicular = await Sanitario.count({
            where: {
                nomeTratamento: "Medicação contra Estomatite Vesicular"
            }
        })    

        bufalos.forEach(bufalo => {
            bufalo.sanitario = sanitario.filter(z => z.tag === bufalo.tag);
        });

        // Renderizar o template 'sanitario' passando todos os dados necessários
        res.render('sanitario', {
            sanitario,
            bufalos,
            ultimoBufaloId,
            totalBufalos,
            contraVerminoses,
            hemoglobinuriaBacilar,
            contraBrucelose,
            contraFebreAftosa,
            estomatiteVesicular
        })
    } catch (error) {
        console.error('Erro ao buscar os dados:', error)
        res.status(500).send('Erro no servidor')
    }
})

export default router
