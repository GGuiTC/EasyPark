const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const adminAut = require('../middleware/adminAutoriz');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));


router.post("/dados_arduino", (req,res)=>{
    let id_vaga = req.body.id_vaga;
    let date = req.body.date;
    let time = req.body.time;

    console.log(id_vaga);
    console.log(date);
    console.log(time);
})

router.get("/dados_arduino", (req,res)=>{
    let id_vaga = req.query.id_vaga;
    let date = req.query.date;
    let time = req.query.time;

    console.log(id_vaga);
    console.log(date);
    console.log(time);
})

router.get("/dados_arduino/:id_vaga/:date/:time", (req,res)=>{
    let id_vaga = req.params.id_vaga;
    let date = req.params.date;
    let time = req.params.time;

    console.log(id_vaga);
    console.log(date);
    console.log(time);
})


module.exports = router;