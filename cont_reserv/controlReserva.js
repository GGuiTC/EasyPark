const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Reserva = require('./Reserva');
const Perfil = require('../cont_perfil/Perfil')
const Vaga = require('../cont_park/Park')
const Veiculo = require('../cont_veiculo/Vehicles')

const adminAut = require('../middleware/adminAutoriz');
const { where } = require('sequelize');

router.use(bodyParser.urlencoded({extended: true}));


router.get("/reserv_page", adminAut, (req, res) => {
    const id = req.session.usuario.id;

    Perfil.findOne({
        where: { id_usuario: id }
    }).then((perfil) => {
        const id_perfil = perfil.id_perfil;

        Reserva.findAll({
            where: { id_perfil: id_perfil },
            include: [
                { model: Vaga, as: 'vaga', attributes: ['numero'] },
                { model: Veiculo, as:'veiculo', attributes: ['marca', 'modelo', 'cor', 'placa'] }
            ]
        }).then((reservas) => {
            res.render("reserv/reserv-page", { reservas, id });
        }).catch((error) => {
            console.error("Erro ao buscar reservas:", error);
            res.status(500).send("Erro ao buscar reservas.");
        });
    }).catch((error) => {
        console.error("Erro ao buscar perfil:", error);
        res.status(500).send("Erro ao buscar perfil.");
    });
});

router.post("/reserva_vaga",adminAut, (req, res) => {
    let date = req.body.date;
    let time = req.body.time;
    let vagasStatus = []; // Array para armazenar o status de cada vaga

    // Busca todas as vagas em ordem crescente de id_vaga
    Vaga.findAll({
        order: [['id_vaga', 'ASC']]
    }).then((vagas) => {
        const promises = vagas.map((vaga) => {
            return Reserva.findOne({
                where: {
                    data_reserva: date,
                    prev_chegada: time,
                    id_vaga: vaga.id_vaga
                }
            }).then((reserva) => {
                vagasStatus.push({
                    id_vaga: vaga.id_vaga,
                    tipo_vaga: vaga.tipo_vaga,
                    numero: vaga.numero,
                    status: reserva ? "reservado" : "vazio"
                });
            });
        });

        // Aguarda todas as Promises antes de renderizar a página
        Promise.all(promises).then(() => {
            // Ordena o array vagasStatus por id_vaga, para garantir a ordem correta
            vagasStatus.sort((a, b) => a.id_vaga - b.id_vaga);

            res.render("park/park-page", { vagasStatus, date, time});
        }).catch((error) => {
            console.error("Erro ao buscar status das reservas:", error);
            res.status(500).send("Erro ao processar os dados.");
        });
    }).catch((error) => {
        console.error("Erro ao buscar vagas:", error);
        res.status(500).send("Erro ao buscar as vagas.");
    });
});

router.get("/reserva_vaga/:id/:numero/:date/:time", adminAut, (req, res)=>{
    const id = req.session.usuario.id;
    let id_vaga = req.params.id;
    let numero = req.params.numero;
    let date = req.params.date;
    let time = req.params.time;
    Perfil.findOne({
        where: {
            id_usuario: id
        }
    }).then((perfil)=>{
        Veiculo.findAll({
            where:{
                id_usuario: id
            }
        }).then((veiculos)=>{
            res.render("reserv/reserva-vaga", { perfil, veiculos, id_vaga, numero, date, time })
        })
    })
})

router.post("/cadastro_reserva", (req,res)=>{
    let id_vaga = req.body.vaga;
    let id_perfil = req.body.perfil;
    let id_veiculo = req.body.veiculo;
    let date = req.body.date;
    let time = req.body.time;

    Reserva.create({
        prev_chegada: time,
        data_reserva: date,
        id_vaga: id_vaga,
        id_veiculo: id_veiculo,
        id_perfil: id_perfil
    }).then(()=>{
        res.redirect("/reserv_page")
    })
})

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const bodyParser = require('body-parser');
// const adminAut = require('../middleware/adminAutoriz');


// router.use(bodyParser.urlencoded({extended: true}));     ------------------THIS IS THE BASIC------------------

// router.get("/perfil_page", (req,res)=>{
//     res.render("perfil/perfil-page");
// })

// module.exports = router;