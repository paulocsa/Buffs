import express from 'express'
const router = express.Router()
import Bufalo from '../models/Bufalo.js'
import Reproducao from '../models/Reproducao.js'
import { where } from 'sequelize'

router.get('/reproducao', async (req, res) => {
    try {
        const bufalos = await Bufalo.findAll() // Buscar todos os búfalos cadastrados
        const reproducao = await Reproducao.findAll() //buscar os dados reprodutivos
        const ultimoBufalo = await Bufalo.findOne({ order: [['id', 'DESC']] }) // Buscar último búfalo cadastrado

        const ultimoBufaloId = ultimoBufalo ? ultimoBufalo.id : null

        // Contagem de búfalos em cada categoria
        const totalBufalos = bufalos.length;
        const tag = await Bufalo.count({
            where: {
                tag: "TAG"
            }
        })
        const nomeBufalo = await Bufalo.count({
            where: {
                tag: "Nome do Búfalo"
            }
        })
        const raca = await Bufalo.count({
            where: {
                raca: "Raça"
            }
        })
        const taxaConcepcao = await Reproducao.count({
            where: {
                taxaConcepcao: "Taxa de Concepção",
            }
        })
        const intervaloReproducao = await Reproducao.count({
            where: {
                intervaloReproducao: "Intervalo de Reprodução"
            }
        })
        const numeroReproducao = await Reproducao.count({
            where: {
                numeroReproducao: "Número de Reproduções"
            }
        })
        const observacaoParto = await Reproducao.count({
            where: {
                observacaoParto: "Observações"
            }
        })
        const tipoInseminacao = await Reproducao.count({
            where: {
                tipoInseminacao: "Tipo de Inseminação"
            }
        })
        const ultimaInseminacao = await Reproducao.count({
            where: {
                ultimaInseminacao: "Última Inseminação"
            }
        })
        const dataParto = await Reproducao.count({
            where: {
                dataParto: "Data de Parto"
            }
        })
        const bufalasGestantes = await Reproducao.count({
            where: {
                bufalasGestantes: "Búfalas Gestantes"
            }
        })
        const bufalasEmGestacao = await Reproducao.count({
            where: {
                bufalasEmGestacao: "Búfalas em Gestação"
            }
        })
        const bufalasAptasInseminacao = await Reproducao.count({
            where: {
                bufalasAptasInseminacao: "Búfalas Aptas para Inseminação"
            }
        })
 

       // Renderizar o template 'zootecnico' passando todos os dados necessários
        res.render('reproducao', {
            reproducao,
            tag,
            bufalos,
            nomeBufalo,
            raca,
            ultimoBufaloId,
            totalBufalos,
            taxaConcepcao,
            intervaloReproducao,
            numeroReproducao,
            observacaoParto,
            tipoInseminacao,
            ultimaInseminacao,
            dataParto,
            bufalasGestantes,
            bufalasEmGestacao,
            bufalasAptasInseminacao

            
            
        })
    } catch (error) {
        console.error('Erro ao buscar os dados:', error)
        res.status(500).send('Erro no servidor')
    }
})

export default router
