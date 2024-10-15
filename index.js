const express = require('express');
const app = express();
const conexao = require('./database/basedados');
const Usuario = require('./cont_users/Users');
const ControleUsuario = require('./cont_users/controlUsers');
const Perfil = require('./cont_perfil/Perfil');
const ControlePerfil = require('./cont_perfil/controlPerfil');
// ao criar a tabela de banco de dados, dar um const Vehicle aqui
const ControleVeiculo = require('./cont_veiculo/controlVeiculo');
// ao criar a tabela de banco de dados, dar um const Reserv aqui
const ControleReserva = require('./cont_reserv/controlReserva');
const session = require('express-session');
const adminAut = require('./middeware/adminAutoriz');

 app.use(session({
     secret: "qualquercoisa",
    resave: "false",
     saveUninitialized: false,
    cookie:{maxAge: 86500 *30} }))

app.use("/", ControleUsuario);
app.use("/", ControlePerfil);
app.use("/", ControleVeiculo);
app.use("/", ControleReserva);

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







app.listen(3000,()=>{
    console.log("SERVIDOR RODANDO");
})