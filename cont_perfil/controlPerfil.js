const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Perfil = require('./Perfil');

const adminAut = require('../middleware/adminAutoriz');

router.use(bodyParser.urlencoded({extended: true}));

router.get("/perfil_page",adminAut, (req,res)=>{
    id = req.session.usuario.id;
    res.render("perfil/perfil-page", { id });
})

router.post("/cadastra-edita-perfil", (req,res)=>{
    let id = req.body.id; // ->->->->->->->->->->->->->-> MUDAR
    let nome = req.body.nome;
    let email = req.body.email;
    let telefone = req.body.telefone;
    let sexo = req.body.sexo;
    let cpf = req.body.cpf;
    let rg = req.body.rg;
    let data_nasc = req.body.data_nasc;

    
    // Perfil.findOne({
    //     where: {email: email}
    // }).then((perfil)=>{
    //     if(perfil == undefined){
    //         Perfil.create({
    //             nome: nome,
    //             email: email,
    //             telefone: telefone,
    //             sexo: sexo,
    //             cpf: cpf,
    //             rg: rg,
    //             data_nasc: data_nasc
    //         }).then(()=>{
    //             res.render("perfil/perfil-page");
    //         })
    //     }else{
            
    //     }
    // })
    
    // --------------- NOME ---------------

    Perfil.findOne({
        where: {nome: nome}
    }).then((perfil)=>{
        if(perfil == undefined){
            Perfil.create({
                nome: nome
            }).then(()=>{
                res.render("perfil/perfil-page");
            })
        }else{
            
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