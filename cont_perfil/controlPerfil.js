const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Perfil = require('./Perfil');

const adminAut = require('../middleware/adminAutoriz');
const { where } = require('sequelize');

router.use(bodyParser.urlencoded({extended: true}));

router.get("/perfil_page",adminAut, (req,res)=>{
    let usuario = req.session.usuario;
    let id_usuario = req.session.usuario.id;
    let nome = req.session.usuario.nome;
    let email = req.session.usuario.email;
    Perfil.findOne({
        where: {id_perfil: id_usuario}
    }).then((perfil)=>{
        if(perfil == undefined){
            Perfil.create({
                nome: nome,
                email: email
            }).then((perfil)=>{
                res.render("perfil/perfil-page", {perfil, nome, usuario})
            })
        }else{
            res.render("perfil/perfil-page", {perfil, nome, usuario})
        }
    
    })
})

router.post("/cadastra-edita-perfil", adminAut, (req,res)=>{
    let id_perfil = req.body.id;
    let nome = req.body.nome;
    let email = req.body.email;
    let telefone = req.body.telefone;
    let sexo = req.body.sexo;
    let cpf = req.body.cpf;
    let rg = req.body.rg;
    let data_nasc = req.body.data_nasc;


    Perfil.findOne({
        where: {id_perfil: id_perfil}
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
                where: {id_perfil: id_perfil}
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