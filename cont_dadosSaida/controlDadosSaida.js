const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const adminAut = require('../middleware/adminAutoriz');
const dadosSaida = require('./dadosSaida');

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
router.post("/dados_arduino", (req,res)=>{
    let id_vaga = req.body.id_vaga; // id vaga
    let date = req.body.date; // data chegada
    let hr_chegada = req.body.hr_chegada; // horario chegada

    dadosSaida.create({
        id_vaga: id_vaga,
        data_chegada: date,
        horario_chegada: hr_chegada
    })
})

//VEICULO SAI
router.post("/dados_arduino_update", (req,res)=>{
    let id_vaga = req.body.id_vaga; // id da vaga vinda do arduino
    let date = req.body.date; // date chegada guardado pelo arduino
    let hr_chegada = req.body.hr_chegada; // hora chegada guardada pelo arduino
    let time = req.body.time; // tempo do veículo estacionado
    
    dadosSaida.update({
        tempo_estacionado: time
    }, {
        where: {
            data_chegada: date,
            horario_chegada: hr_chegada,
            id_vaga: id_vaga
        }
    })
})


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
