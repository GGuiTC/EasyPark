const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Perfil = require('./Perfil');

const adminAut = require('../middleware/adminAutoriz');
const { where } = require('sequelize');

router.use(bodyParser.urlencoded({extended: true}));

router.get("/perfil_page",adminAut, (req,res)=>{
    let id_usuario = req.session.usuario.id;
    nome = req.session.usuario.nome;
    let email = req.session.usuario.email;
    Perfil.findOne({
        where: {id_usuario: id_usuario}
    }).then((perfil)=>{
        if(perfil == undefined){
            Perfil.create({
                id_usuario: id_usuario,
                nome: nome,
                email: email
            }).then((perfil)=>{
                res.render("perfil/perfil-page", {perfil, nome})
            })
        }else{
            res.render("perfil/perfil-page", {perfil, nome})
        }
    
    })
})

router.post("/cadastra-edita-perfil", adminAut, (req,res)=>{
    // TEM Q ARRUMAR:
    // 1 - SE O DADO NO BANCO DE DADOS E NO FORM FOR IGUAL, NÃO EDITA
    let id_perfil = req.body.id;
    let nome = req.body.nome;
    let email = req.body.email;
    let telefone = req.body.telefone;
    let sexo = req.body.sexo;
    let cpf = req.body.cpf;
    let rg = req.body.rg;
    let data_nasc = req.body.data_nasc;


    Perfil.findOne({
        where: {id_usuario: id_perfil}
    }).then((perfil)=>{
        if(perfil != undefined){
            Perfil.update({
                nome: nome,
                email: email,
                telefone: telefone,
                sexo: sexo,
                cpf: cpf,
                rg: rg,
                data_nasc: data_nasc
            },
            {
                where: {id_usuario: id_perfil}
            }).then(()=>{
                res.redirect("/perfil_page");
            })
        }
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