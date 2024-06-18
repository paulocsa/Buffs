import express from 'express'
const router = express.Router()
import Bufalo from '../models/Bufalo.js'
import Zootecnico from '../models/Zootecnico.js'
import { where } from 'sequelize'
import Auth from "../middleware/Auth.js"

// Rota para listar todos os búfalos
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

router.get('/rebanhos', Auth, (req, res) => {
    Bufalo.findAll()
        .then(bufalos => {
            // Embaralhe os dados dos búfalos
            const shuffledBufalos = shuffle(bufalos);

            Zootecnico.findOne({ where: { /* Condições de busca, se necessário */ } })
                .then(zootecnico => {
                    res.render('rebanhos', { bufalos: shuffledBufalos, zootecnico });
                })
                .catch(err => {
                    req.flash('danger', 'Erro ao buscar dados do zootécnico.');
                    res.render('rebanhos', { bufalos: shuffledBufalos, zootecnico: null });
                });
        })
        .catch(err => {
            req.flash('danger', 'Erro ao listar búfalos.');
            res.redirect('/');
        });
});

// Rota para criar um novo búfalo
router.post('/createBufalo', (req, res) => {
    const { id, tag, valorArroba, nome, idade, peso, raca, sexo, dataNascimento } = req.body

    Bufalo.findOne({ where: { tag } }).then(bufalo => {
        if (!bufalo) {
            Bufalo.create({
                tag,
                valorArroba,
                nome,
                idade,
                peso,
                raca,
                sexo,
                dataNascimento
            }).then(() => {
                req.flash('success', 'Búfalo cadastrado com sucesso!')
                return res.redirect('/rebanhos')
            }).catch(err => {
                req.flash('danger', 'Erro ao cadastrar búfalo.')
                return res.redirect('/cadastroBufalo')
            })
        } else {
            req.flash('danger', 'Búfalo já possui cadastro.')
            return res.redirect('/cadastroBufalo')
        }
    }).catch(err => {
        req.flash('danger', 'Erro ao verificar búfalo.')
        return res.redirect('/cadastroBufalo')
    });
});

// Rota para exibir o formulário de edição de búfalo
router.get('/editBufalo/:id', (req, res) => {
    const { id } = req.params;
    Bufalo.findByPk(id).then(bufalo => {
        if (bufalo) {
            res.render('editBufalo', { bufalo })
        } else {
            req.flash('danger', 'Búfalo não encontrado.')
            res.redirect('/rebanhos')
        }
    }).catch(err => {
        req.flash('danger', 'Erro ao buscar búfalo.')
        res.redirect('/rebanhos')
    });
});

// Rota para atualizar um búfalo
router.post('/updateBufalo/:id', (req, res) => {
    const { id } = req.params
    const { tag, valorArroba, nome, idade, peso, raca, sexo, dataNascimento } = req.body

    Bufalo.update({
        tag,
        valorArroba,
        nome,
        idade,
        peso,
        raca,
        sexo,
        dataNascimento
    }, {
        where: { id }
    }).then(result => {
        if (result[0] > 0) {
            req.flash('success', 'Búfalo atualizado com sucesso!')
            res.redirect('/rebanhos')
        } else {
            req.flash('danger', 'Erro ao atualizar búfalo.')
            res.redirect(`/editBufalo/${id}`)
        }
    }).catch(err => {
        req.flash('danger', 'Erro ao atualizar búfalo.')
        res.redirect(`/editBufalo/${id}`)
    });
});

// Rota para deletar um búfalo
router.post('/deleteBufalo/:id', (req, res) => {
    const { id } = req.params;

    Bufalo.destroy({
        where: { id }
    }).then(result => {
        if (result > 0) {
            req.flash('success', 'Búfalo deletado com sucesso!')
            res.redirect('/rebanhos')
        } else {
            req.flash('danger', 'Erro ao deletar búfalo.')
            res.redirect('/rebanhos')
        }
    }).catch(err => {
        req.flash('danger', 'Erro ao deletar búfalo.')
        res.redirect('/rebanhos')
    })
})

export default router
