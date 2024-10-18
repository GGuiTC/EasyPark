const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Perfil = require('./Perfil');

const adminAut = require('../middleware/adminAutoriz');

router.use(bodyParser.urlencoded({extended: true}));

router.get("/perfil_page",adminAut, (req,res)=>{
    let id_usuario = req.session.usuario.id;
    let nome = req.session.usuario.nome;
    let email = req.session.usuario.email;
    //arruma
    Perfil.findOne({
        where: {id_usuario: id_usuario}
    }).then((perfil)=>{
        if(perfil == undefined){
            Perfil.create({
                id_usuario: id_usuario,
                nome: nome,
                email: email
            }).then((perfil)=>{
                res.render("perfil/perfil-page", {perfil})
            })
        }else{
            res.render("perfil/perfil-page", {perfil})
        }
    
    })
})

router.post("/cadastra-edita-perfil", (req,res)=>{
    let id_perfil = req.body.id;
    let nome = req.body.nome;
    let email = req.body.email;
    let telefone = req.body.telefone;
    let sexo = req.body.sexo;
    let cpf = req.body.cpf;
    let rg = req.body.rg;
    let data_nasc = req.body.data_nasc;


    
    // --------------- NOME ---------------
    Perfil.findOne({
        where: {id_perfil: id_perfil}
    }).then((perfil)=>{
        if(perfil == undefined){
            Perfil.create({
                nome: nome
            }).then((perfil)=>{
                res.render("perfil/perfil-page", {perfil});
            })
        }else{
            Perfil.update({
                nome: nome
            }).then((perfil)=>{
                res.render("perfil/perfil-page", {perfil});
            })
        }
    })



    // --------------- EMAIL ---------------
    // --------------- TELEFONE ---------------
    // --------------- SEXO ---------------
    // --------------- CPF ---------------
    // --------------- RG ---------------
    // --------------- DATA_NASC ---------------


    // A Ideia é: 
    // Se estiver no banco de dados -> edita
    // Senão -> cadastra
})

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const bodyParser = require('body-parser');

// router.use(bodyParser.urlencoded({extended: true}));     ------------------THIS IS THE BASIC------------------

// router.get("/perfil_page", (req,res)=>{
//     res.render("perfil/perfil-page");
// })

// module.exports = router;