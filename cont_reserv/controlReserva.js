const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Reserva = require('./Reserva');
const Perfil = require('../cont_perfil/Perfil');
const Vaga = require('../cont_park/Park');
const Veiculo = require('../cont_veiculo/Vehicles');
const DadosSaida = require('../cont_dadosSaida/dadosSaida')

const adminAut = require('../middleware/adminAutoriz');
const { where, Op } = require('sequelize');

router.use(bodyParser.urlencoded({extended: true}));


router.get("/reserv_page", adminAut, async (req, res) => {
    try {
        let id = req.session.usuario.id;
        let usuario = req.session.usuario;
        let nome = req.session.usuario.nome;

        const perfil = await Perfil.findOne({ where: { id_perfil: id } });
        if (!perfil) {
            return res.status(404).send("Perfil não encontrado.");
        }

        const id_perfil = perfil.id_perfil;

        const reservas = await Reserva.findAll({
            where: { id_perfil: id_perfil },
            include: [{ model: Vaga, as: 'vaga', attributes: ['numero'] }]
        });

        const reservasComVeiculos = await Promise.all(
            reservas.map(async (reserva) => {
                const veiculo = await Veiculo.findOne({
                    where: { id_veiculo: reserva.id_veiculo },
                    attributes: ['marca', 'modelo', 'cor', 'placa']
                });

                return {
                    ...reserva.toJSON(),
                    veiculo: veiculo || null
                };
            })
        );

        res.render("reserv/reserv-page", { reservas: reservasComVeiculos, id, nome, usuario });
    } catch (error) {
        console.error("Erro ao buscar reservas:", error);
        res.status(500).send("Erro ao buscar reservas.");
    }
});

router.post("/reserva_vaga", adminAut, (req, res) => {
    let date = req.body.date;
    let time = req.body.time;
    let usuario = req.session.usuario;
    let vagasStatus = [];

    Vaga.findAll({
        order: [['id_vaga', 'ASC']]
    }).then((vagas) => {
        DadosSaida.findAll({
            where: {
                data_chegada: date,
                horario_chegada: {
                    [Op.lte]: time
                }
            }
        }).then((dadosSaida) => {
            const vagasOcupadas = dadosSaida
                .filter((dado) => !dado.tempo_estacionado)
                .map((dado) => dado.id_vaga);

            const promises = vagas.map((vaga) => {
                return Reserva.findOne({
                    where: {
                        data_reserva: date,
                        prev_chegada: {
                            [Op.lte]: time
                        },
                        id_vaga: vaga.id_vaga
                    },
                    order: [['prev_chegada', 'DESC']]
                }).then((reserva) => {
                    const status = vagasOcupadas.includes(vaga.id_vaga)
                        ? "ocupado"
                        : reserva
                        ? "reservado"
                        : "vazio";

                    vagasStatus.push({
                        id_vaga: vaga.id_vaga,
                        tipo_vaga: vaga.tipo_vaga,
                        numero: vaga.numero,
                        status
                    });
                });
            });

            Promise.all(promises).then(() => {
                vagasStatus.sort((a, b) => a.id_vaga - b.id_vaga);

                res.render("park/park-page", { vagasStatus, date, time, usuario });
            }).catch((error) => {
                console.error("Erro ao buscar status das reservas:", error);
                res.status(500).send("Erro ao processar os dados.");
            });
        }).catch((error) => {
            console.error("Erro ao buscar dados de saída:", error);
            res.status(500).send("Erro ao buscar os dados de saída.");
        });
    }).catch((error) => {
        console.error("Erro ao buscar vagas:", error);
        res.status(500).send("Erro ao buscar as vagas.");
    });
});


router.get("/reserva_vaga", adminAut, (req, res)=>{
    const id = req.session.usuario.id;
    let usuario = req.session.usuario;
    let id_vaga = req.query.id_vaga;
    let numero = req.query.numero;
    let date = req.query.date;
    let time = req.query.time;
    Perfil.findOne({
        where: {
            id_perfil: id
        }
    }).then((perfil)=>{
        Veiculo.findAll({
            where:{
                id_perfil: id
            }
        }).then((veiculos)=>{
            res.render("reserv/reserva-vaga", { perfil, veiculos, id_vaga, numero, date, time, usuario })
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
});

router.get("/cancel-reserv", adminAut, (req, res) => {
    let id_reserva = req.query.id_reserva;

    if (!id_reserva) {
        return res.status(400).send("Reserva não especificada.");
    }

    Reserva.destroy({
        where: { id_reserva: id_reserva }
    }).then(() => {
        res.redirect("/reserv_page");
    }).catch((error) => {
        console.error("Erro ao cancelar a reserva:", error);
        res.status(500).send("Erro ao cancelar a reserva.");
    });
});


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