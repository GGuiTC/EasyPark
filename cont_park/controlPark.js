const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Vaga = require('./Park');

const adminAut = require('../middleware/adminAutoriz');

router.use(bodyParser.urlencoded({extended: true}));

router.get("/mapa-cria-vaga", adminAut, (req,res)=>{
    Vaga.findAll().then((vagas)=>{
        res.render("park/mapa-cria-vaga", {vagas})
    })
})

router.get("/cria-vaga", adminAut, (req,res)=>{
    let i = 0
    Vaga.findAll().then((vagas)=>{
        vagas.forEach((vaga)=>{
            i = i + 1
        });
        i = i + 1
        res.render("park/cadastra-vaga", {vagas, i});
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