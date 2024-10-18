const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Perfil = require('./Perfil');

const adminAut = require('../middleware/adminAutoriz');
const { where } = require('sequelize');

router.use(bodyParser.urlencoded({extended: true}));

router.get("/perfil_page",adminAut, (req,res)=>{
    let id_usuario = req.session.usuario.id;
    let nome = req.session.usuario.nome;
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
                res.render("perfil/perfil-page", {perfil})
            })
        }else{
            res.render("perfil/perfil-page", {perfil})
        }
    
    })
})

router.post("/cadastra-edita-perfil", (req,res)=>{
    // TEM Q ARRUMAR:
    // 1 - SE O DADO NO BANCO DE DADOS E NO FORM FOR IGUAL, NÃO EDITA
    // 2 - TELA DE LOADING DEPOIS DE ATUALIZAR E DEPOIS REDIRECIONAR PARA /perfil_page
    let id_perfil = req.body.id;
    let nome = req.body.nome;
    let email = req.body.email;
    let telefone = req.body.telefone;
    let sexo = req.body.sexo;
    let cpf = req.body.cpf;
    let rg = req.body.rg;
    let data_nasc = req.body.data_nasc;


    
    // --------------- NOME ---------------
    // ARRUMAR PARA QUE, SE FOR ALTERADO, MUDE NA TEBELA USUARIO TAMBEM
    Perfil.findOne({
        where: {id_usuario: id_perfil}
    }).then((perfil)=>{
        if(perfil != undefined){
            Perfil.update({
                nome: nome
            },{where: {id_usuario: id_perfil}}).then((perfil)=>{
                res.render("perfil/perfil-page", {perfil});
            })
        }
    })



    // --------------- EMAIL ---------------
    // ARRUMAR PARA QUE, SE FOR ALTERADO, MUDE NA TEBELA USUARIO TAMBEM
    Perfil.findOne({
        where: {id_usuario: id_perfil}
    }).then((perfil)=>{
        if(perfil != undefined){
            Perfil.update({
                email: email
            },{where: {id_usuario: id_perfil}}).then((perfil)=>{
                res.render("perfil/perfil-page", {perfil});
            })
        }
    })



    // --------------- TELEFONE ---------------
    Perfil.findOne({
        where: {id_usuario: id_perfil}
    }).then((perfil)=>{
        if(perfil != undefined){
            Perfil.update({
                telefone: telefone
            },{where: {id_usuario: id_perfil}}).then((perfil)=>{
                res.render("perfil/perfil-page", {perfil});
            })
        }
    })



    // --------------- SEXO ---------------
    Perfil.findOne({
        where: {id_usuario: id_perfil}
    }).then((perfil)=>{
        if(perfil != undefined){
            Perfil.update({
                sexo: sexo
            },{where: {id_usuario: id_perfil}}).then((perfil)=>{
                res.render("perfil/perfil-page", {perfil});
            })
        }
    })



    // --------------- CPF ---------------
    Perfil.findOne({
        where: {id_usuario: id_perfil}
    }).then((perfil)=>{
        if(perfil != undefined){
            Perfil.update({
                cpf: cpf
            },{where: {id_usuario: id_perfil}}).then((perfil)=>{
                res.render("perfil/perfil-page", {perfil});
            })
        }
    })



    // --------------- RG ---------------
    Perfil.findOne({
        where: {id_usuario: id_perfil}
    }).then((perfil)=>{
        if(perfil != undefined){
            Perfil.update({
                rg: rg
            },{where: {id_usuario: id_perfil}}).then((perfil)=>{
                res.render("perfil/perfil-page", {perfil});
            })
        }
    })



    // --------------- DATA_NASC ---------------
    Perfil.findOne({
        where: {id_usuario: id_perfil}
    }).then((perfil)=>{
        if(perfil != undefined){
            Perfil.update({
                data_nasc: data_nasc
            },{where: {id_usuario: id_perfil}}).then((perfil)=>{
                res.render("perfil/perfil-page", {perfil});
            })
        }
    })



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