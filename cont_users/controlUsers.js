const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Usuario = require('./Users');
const Perfil = require('../cont_perfil/Perfil')
const bcrypt = require('bcryptjs');
const adminAut = require('../middleware/adminAutoriz');
const { Op } = require('sequelize');

router.use(bodyParser.urlencoded({extended: true}));

router.get("/login_page", (req,res)=>{
    res.render("user/login_page")
})

router.get("/singin_page", (req,res)=>{
    res.render("user/singin_page")
})

router.get("/accounts_page", adminAut, (req,res)=>{
    let usuario = req.session.usuario;
    res.render("user/change_account", { usuario })
})

// router.get("/define_admin", adminAut, (req,res)=>{
//     let usuario = req.session.usuario;
//     res.render("user/define_admin", {usuario});
// })

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
                let nome_perfil = usuario.nome
                let email_perfil = usuario.email
                Perfil.create({
                    nome: nome_perfil,
                    email: email_perfil
                }).then(()=>{
                    res.redirect("login_page");
                })
            })
        }
        else{
            res.redirect("login_page");
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


router.get("/define_admin", adminAut, async (req, res) => {
    const { search } = req.query; // Captura o valor da pesquisa.
    let where = {};
    let usuario_session = req.session.usuario;

    // Condição para pesquisa.
    if (search) {
        where = {
            [Op.or]: [
                { id_usuario: { [Op.like]: `%${search}%` } },
                { nome: { [Op.like]: `%${search}%` } },
                { email: { [Op.like]: `%${search}%` } },
                { nivel_usuario: { [Op.like]: `%${search}%` } }
            ]
        };
    }

    try {
        const usuarios = await Usuario.findAll({ where });
        res.render("user/define_admin", { usuario_session, usuarios, search });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao carregar usuários.");
    }
});

router.post("/define_admin/:id/alterar-nivel", async (req, res) => {
    const { id } = req.params;
    const { nivel_usuario } = req.body;

    try {
        const usuario = await Usuario.findByPk(id);
        if (usuario) {
            usuario.nivel_usuario = nivel_usuario;
            await usuario.save();
        }
        res.redirect("/define_admin");
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao alterar nível do usuário.');
    }
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