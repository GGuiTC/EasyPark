const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const adminAut = require('../middleware/adminAutoriz');
const dadosSaida = require('./dadosSaida');
const Vaga = require('../cont_park/Park')
const { where } = require('sequelize');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));


// ROTAS PRA TESTE DE VINDAS DE DADOS
router.get("/dados_saida", adminAut, (req,res)=>{
    let usuario = req.session.usuario
    res.render("dadosSaida/dadosSaida", {usuario});
})

router.get("/dados_saida_updt", adminAut, (req,res)=>{
    let usuario = req.session.usuario
    res.render("dadosSaida/dadosSaidaUpdt", {usuario});
})


// TESTE DE VINDA DE DADOS
//VEICULO CHEGA
// router.post("/dados_arduino", (req,res)=>{
//     let id_vaga = req.body.id_vaga; // id vaga vindo do post

//     // Obtém a data e o horário atuais
//     let now = new Date();
//     let date = now.toISOString().split("T")[0]; // Captura a data no formato YYYY-MM-DD
//     let hr_chegada = now.toTimeString().split(" ")[0]; // Captura o horário no formato HH:MM:SS

//     dadosSaida.create({
//         id_vaga: id_vaga,
//         data_chegada: date,
//         horario_chegada: hr_chegada
//     }).then((ds) => {
//         id_vaga = ds.id_vaga;
//         date = ds.data_chegada;
//         hr_chegada = ds.horario_chegada;

//         dadosSaida.findOne({
//             where:{
//                 id_vaga: id_vaga,
//                 data_chegada: date,
//                 horario_chegada: hr_chegada
//             }
//         }).then((DS)=>{
//             id_dados = DS.id_dados;
//             console.log(id_dados);
//             // res.status(201).send(id_dados);
//         })
//     }).catch((error) => {
//         console.error("Erro ao mandar dados:", error);
//         res.status(500).send("Erro ao mandar os dados ao arduino.");
//     });
// })






// //VEICULO SAI
// router.post("/dados_arduino_update", (req,res)=>{
//     let id_dados = req.body.id_dados; // id da vaga vinda do arduino
//     let time = req.body.time; // tempo do veículo estacionado

//     dadosSaida.update({
//         tempo_estacionado: time
//     }, {
//         where: {
//             id_dados: id_dados
//         }
//     })
// })






//               GET PARAMS
router.get("/dados_arduino/:id_vaga", (req,res)=>{
    let id_vaga = req.params.id_vaga; // id vaga vindo da url

    // Obtém a data e o horário atuais
    let now = new Date();
    let date = now.toISOString().split("T")[0]; //Captura a data no formato YYYY-MM-DD
    let hr_chegada = now.toTimeString().split(" ")[0]; // Captura o horário no formato HH:MM:SS

    dadosSaida.create({
        id_vaga: id_vaga,
        data_chegada: date,
        horario_chegada: hr_chegada
    }).then((ds) => {
        id_vaga = ds.id_vaga;
        date = ds.data_chegada;
        hr_chegada = ds.horario_chegada;

        dadosSaida.findOne({
            where:{
                id_vaga: id_vaga,
                data_chegada: date,
                horario_chegada: hr_chegada
            }
        }).then((DS)=>{
            id_dados = DS.id_dados;
            // console.log(id_dados);
            res.status(200).send(String(id_dados));
        })
    }).catch((error) => {
        console.error("Erro ao mandar dados:", error);
        res.status(500).send("Erro ao mandar os dados ao arduino.");
    });
})

//               GET PARAMS
router.get("/dados_arduino/:id_dados/:tempo_est", (req,res)=>{
    let id_dados = req.params.id_dados;
    let tempo_est = req.params.tempo_est;

    let id_dados_int = parseInt(id_dados, 10);
    let tempo_est_int = parseInt(tempo_est, 10);

        dadosSaida.update({
        tempo_estacionado: tempo_est_int
    }, {
        where: {
            id_dados: id_dados_int
        }
    })
})

router.get("/historico_vagas", adminAut, async (req, res) => {
    let usuario = req.session.usuario;

    const { data, horario, tempo, numero } = req.query;

    let whereClause = {};
    if (data) whereClause.data_chegada = data;
    if (horario) whereClause.horario_chegada = horario;
    if (tempo) whereClause.tempo_estacionado = tempo;

    let includeClause = [{
        model: Vaga,
        as: 'vaga',
        attributes: ['numero'],
    }];

    if (numero) {
        includeClause[0].where = { numero };
    }

    try {
        const dadosSaidas = await dadosSaida.findAll({
            where: whereClause,
            include: includeClause,
        });

        res.render("dadosSaida/historico-vagas", { usuario, dadosSaidas, filtros: { data, horario, tempo, numero } });
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        res.status(500).send("Erro ao carregar histórico de vagas.");
    }
});







// ----------------------- MÉTODOS PARA PEGAR VALORES DO ARDUINO -----------------------
//               POST
// router.post("/dados_arduino", (req,res)=>{
//     let id_vaga = req.body.id_vaga;
//     let date = req.body.date;
//     let time = req.body.time;

//     console.log(id_vaga);
//     console.log(date);
//     console.log(time);
// })


//               GET QUERY
// router.get("/dados_arduino", (req,res)=>{
//     let id_vaga = req.query.id_vaga;
//     let date = req.query.date;
//     let time = req.query.time;

//     console.log(id_vaga);
//     console.log(date);
//     console.log(time);
// })


//               GET PARAMS
// router.get("/dados_arduino/:id_vaga/:date/:time", (req,res)=>{
//     let id_vaga = req.params.id_vaga;
//     let date = req.params.date;
//     let time = req.params.time;

//     console.log(id_vaga);
//     console.log(date);
//     console.log(time);
// })


module.exports = router;
