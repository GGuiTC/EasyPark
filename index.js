const express = require('express');
const app = express();
const conexao = require('./database/basedados');
const Usuario = require('./cont_users/Users');
const ControleUsuario = require('./cont_users/controlUsers');
const session = require('express-session');
const adminAut = require('./middeware/adminAutoriz');

 app.use(session({
     secret: "qualquercoisa",
    resave: "false",
     saveUninitialized: false,
    cookie:{maxAge: 86500 *30} }))

app.use("/", ControleUsuario);

app.set("view engine","ejs");
app.use(express.static('public'));

conexao.authenticate().then(()=>{
    console.log("CONECTADO COM O BANCO");
}).catch((erroMsg)=>{
    console.log(erroMsg);
})

app.get("/index2",adminAut, (req,res)=>{
    res.render("index2")
})

app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/perfil_page", (req,res)=>{
    res.render("perfil/perfil-page");
})







app.listen(3000,()=>{
    console.log("SERVIDOR RODANDO");
})