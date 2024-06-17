import express from 'express'
const router = express.Router()
import Bufalo from '../models/Bufalo.js'
import Zootecnico from '../models/Zootecnico.js'
import { where } from 'sequelize'

router.get('/zootecnico', async (req, res) => {
    try {
        const bufalos = await Bufalo.findAll() // Buscar todos os búfalos cadastrados
        const zootecnico = await Zootecnico.findAll() //buscar os dados zootecnicos
        const ultimoBufalo = await Bufalo.findOne({ order: [['id', 'DESC']] }) // Buscar último búfalo cadastrado

        const ultimoBufaloId = ultimoBufalo ? ultimoBufalo.id : null

        // Contagem de búfalos em cada categoria
        const totalBufalos = bufalos.length;
        const suplementacaoMineral = await Zootecnico.count({
            where: {
                suplementacao: "Suplemento Mineral",
            }
        })
        const suplementacaoProteico = await Zootecnico.count({
            where: {
                suplementacao: "Suplemento Proteico"
            }
        })
        const suplementacaoEnergetico = await Zootecnico.count({
            where: {
                suplementacao: "Suplemento Energético"
            }
        })
        const suplementacaoVitaminico = await Zootecnico.count({
            where: {
                suplementacao: "Suplemento Vitamínico"
            }
        })
        const capimElefante = await Zootecnico.count({
            where: {
                tipoPastagem: "Capim Elefante"
            }
        })
        const capimTanzania = await Zootecnico.count({
            where: {
                tipoPastagem: "Capim Tanzânia"
            }
        })
        const capimMombaca = await Zootecnico.count({
            where: {
                tipoPastagem: "Capim Mombaça"
            }
        })
        const capimCoastCross = await Zootecnico.count({
            where: {
                tipoPastagem: "Capim Coast Cross"
            }
        })
        


        bufalos.forEach(bufalo => {
            bufalo.zootecnico = zootecnico.filter(z => z.tag === bufalo.tag);
        });

 

       // Renderizar o template 'zootecnico' passando todos os dados necessários
        res.render('zootecnico', {
            zootecnico,
            bufalos,
            ultimoBufaloId,
            totalBufalos,
            suplementacaoMineral,
            suplementacaoProteico,
            suplementacaoEnergetico,
            suplementacaoVitaminico,
            capimElefante,
            capimTanzania,
            capimMombaca,
            capimCoastCross
            
        })
    } catch (error) {
        console.error('Erro ao buscar os dados:', error)
        res.status(500).send('Erro no servidor')
    }
})

export default router
