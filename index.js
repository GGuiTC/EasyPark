const express = require('express');
const app = express();
const conexao = require('./database/basedados');
const Usuario = require('./cont_users/Users');
const ControleUsuario = require('./cont_users/controlUsers');
const Perfil = require('./cont_perfil/Perfil');
const ControlePerfil = require('./cont_perfil/controlPerfil');
const Veiculo = require('./cont_veiculo/Vehicles');
const ControleVeiculo = require('./cont_veiculo/controlVeiculo');
const Vaga = require('./cont_park/Park');
const ControleVaga = require('./cont_park/controlPark');
// ao criar a tabela de banco de dados, dar um const Reserv aqui
const ControleReserva = require('./cont_reserv/controlReserva');
const session = require('express-session');
const adminAut = require('./middleware/adminAutoriz'); /* -------- MNADA PROS BAGULHO */

 app.use(session({
     secret: "qualquercoisa",
    resave: "false",
     saveUninitialized: false,
    cookie:{maxAge: 86500 *30} }))

app.use("/", ControleUsuario);
app.use("/", ControlePerfil);
app.use("/", ControleVeiculo);
app.use("/", ControleVaga);
app.use("/", ControleReserva);

app.set("view engine","ejs");
app.use(express.static('public'));

conexao.authenticate().then(()=>{
    console.log("CONECTADO COM O BANCO");
}).catch((erroMsg)=>{
    console.log(erroMsg);
})

app.get("/dashboard",adminAut, (req,res)=>{
    id = req.session.usuario.id;                /* ------------- COPIA PROS BAGULHO */
    res.render("index2", { id })
})

app.get("/",(req,res)=>{
    res.render("index");
})







app.listen(3000,()=>{
    console.log("SERVIDOR RODANDO");
})