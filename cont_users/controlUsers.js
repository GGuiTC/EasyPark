const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Usuario = require('./Users');
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
            }).then(()=>{
                res.render("user/login_page");//ARRUMAR PARA NÃO DIRECIONAR PARA CADASTRO NOVAMENTE
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
               login: usuario.login
               }
                res.redirect("/index2")
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

// router.use(bodyParser.urlencoded({extended: true}));     ------------------THIS IS THE BASIC------------------

// router.get("/perfil_page", (req,res)=>{
//     res.render("perfil/perfil-page");
// })

// module.exports = router;