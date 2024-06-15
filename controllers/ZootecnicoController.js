import express from 'express';
const router = express.Router();
import Bufalo from '../models/Bufalo.js';
import Zootecnico from '../models/Zootecnico.js';

router.get('/zootecnico', (req, res) => {
    const bufalosPromise = Bufalo.findAll(); // Buscar todos os búfalos cadastrados
    const ultimoBufaloPromise = Bufalo.findOne({ order: [['id', 'DESC']] }); // Buscar último búfalo cadastrado

    Promise.all([bufalosPromise, ultimoBufaloPromise])
        .then(([bufalos, ultimoBufalo]) => {
            const ultimoBufaloId = ultimoBufalo ? ultimoBufalo.id : null;

            // Contagem de búfalos em cada categoria
            const totalBufalos = bufalos.length;
            const bufalosSuplementacao = bufalos.filter(bufalo => bufalo.status === 'suplementacao').length;
            const bufalosObservacao = bufalos.filter(bufalo => bufalo.status === 'observacao').length;

            // Renderizar o template 'zootecnico' passando todos os dados necessários
            res.render('zootecnico', {
                Zootecnico: Zootecnico,
                bufalos: bufalos,
                ultimoBufaloId: ultimoBufaloId,
                totalBufalos: totalBufalos,
                bufalosSuplementacao: bufalosSuplementacao,
                bufalosObservacao: bufalosObservacao
            });
        })
        .catch(error => {
            console.error('Erro ao buscar os dados:', error);
            res.status(500).send('Erro no servidor');
        });
});

export default router;
