const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Vaga = require('./Park');

const adminAut = require('../middleware/adminAutoriz');

router.use(bodyParser.urlencoded({extended: true}));

router.get("/mapa-cria-vaga", adminAut, (req,res)=>{
    let usuario = req.session.usuario;
    Vaga.findAll().then((vagas)=>{
        res.render("park/mapa-cria-vaga", {vagas, usuario})
    });
});

router.get("/cria-vaga", adminAut, (req,res)=>{
    let usuario = req.session.usuario;
    let i = 0
    Vaga.findAll().then((vagas)=>{
        vagas.forEach((vaga)=>{
            i = i + 1
        });
        i = i + 1
        res.render("park/cadastra-vaga", {vagas, i, usuario});
    });
});

router.post("/cadastro-cria-vaga", (req,res)=>{
    let numero = req.body.numero;
    let tipo_vaga = req.body.tipo_vaga;
    let descricao = req.body.descricao;
    let tempo = req.body.tempo;

    let valorFormatado = req.body.preco;

    valorFormatado = valorFormatado.replace("R$ ", "").replace(",", ".");

    let preco = parseFloat(valorFormatado);

    Vaga.create({
        numero: numero,
        tipo_vaga: tipo_vaga,
        descricao: descricao,
        preco: preco,
        tempo: tempo
    }).then(()=>{
        res.redirect("/mapa-cria-vaga");
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