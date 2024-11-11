const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Usuario = require('./Users');
const Perfil = require('../cont_perfil/Perfil')
const bcrypt = require('bcryptjs');

router.use(bodyParser.urlencoded({extended: true}));

router.get("/login_page", (req,res)=>{
    res.render("user/login_page")
})

router.get("/singin_page", (req,res)=>{
    res.render("user/singin_page")
})

router.get("/accounts_page", (req,res)=>{
    res.render("user/change_account")
})

router.post("/cadastro_usuario", (req,res)=>{
    let email = req.body.email;
    let nivel_usuario = 2;
    let nome = req.body.nome;
    Usuario.findOne({
        where: {email: email}
    }).then((usuario)=>{
        if(usuario == undefined){
            let senha = req.body.senha;
            let criahash = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(senha, criahash);
            Usuario.create({
                nome: nome,
                email: email,
                senha: hash,
                nivel_usuario: nivel_usuario,
            }).then((usuario)=>{
                let id_usuario = usuario.id_usuario
                let nome_perfil = usuario.nome
                let email_perfil = usuario.email
                Perfil.create({
                    id_usuario: id_usuario,
                    nome: nome_perfil,
                    email: email_perfil
                }).then(()=>{
                    res.render("user/login_page");
                })
            })
        }
        else{
            res.redirect("/");
        }
    })
})


router.post("/loga_user", (req,res)=>{
    let email = req.body.email;
    let senha = req.body.senha;
    Usuario.findOne({
        where: {
            email: email
        }
    }).then((usuario) =>{
        if(usuario != undefined){
            var correta = bcrypt.compareSync(senha, usuario.senha)
            if(correta){
                req.session.usuario = {
                    id: usuario.id_usuario,
                    nome: usuario.nome,
                    email: usuario.email,
                    nivel_usuario: usuario.nivel_usuario
                }
                res.redirect("/dashboard");
            }
            else{
                res.redirect("/login_page")
            }
        }
        else{
            res.redirect("/login_page")
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