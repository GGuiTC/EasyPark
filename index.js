const express = require('express');
const app = express();
const conexao = require('./database/basedados');
const session = require('express-session');
const adminAut = require('./middleware/adminAutoriz'); /* -------- MNADA PROS BAGULHO */
const { where } = require('sequelize');
// const ngrok = require('@ngrok/ngrok');
const flash = require('connect-flash');

const Usuario = require('./cont_users/Users');
const ControleUsuario = require('./cont_users/controlUsers');
const Perfil = require('./cont_perfil/Perfil');
const ControlePerfil = require('./cont_perfil/controlPerfil');
const Veiculo = require('./cont_veiculo/Vehicles');
const ControleVeiculo = require('./cont_veiculo/controlVeiculo');
const Vaga = require('./cont_park/Park');
const ControleVaga = require('./cont_park/controlPark');
const Reserva = require('./cont_reserv/Reserva');
const ControleReserva = require('./cont_reserv/controlReserva');
const dadosSaida = require('./cont_dadosSaida/dadosSaida');
const ControleDadosSaida = require('./cont_dadosSaida/controlDadosSaida');
// teste
 app.use(session({
     secret: "qualquercoisa",
    resave: "false",
     saveUninitialized: false,
    cookie:{maxAge: 86500 *30} 
}))

app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

app.use("/", ControleUsuario);
app.use("/", ControlePerfil);
app.use("/", ControleVeiculo);
app.use("/", ControleVaga);
app.use("/", ControleReserva);
app.use("/", ControleDadosSaida);

app.set("view engine","ejs");
app.use(express.static('public'));

conexao.authenticate().then(()=>{
    console.log("CONECTADO COM O BANCO");
}).catch((erroMsg)=>{
    console.log(erroMsg);
})

app.get("/dashboard",adminAut, (req,res)=>{
    let usuario = req.session.usuario;                /* ------------- COPIA PROS BAGULHO */
    res.render("index2", { usuario })
})

app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/data_page",adminAut, (req, res)=>{
    let usuario = req.session.usuario;
    let id = req.session.usuario.id;
    Perfil.findOne({
        where: {
            id_perfil: id
        }
    }).then((perfil)=>{
        if(perfil.telefone == undefined & perfil.sexo == undefined & perfil.cpf == undefined & perfil.rg == undefined & perfil.data_nasc == undefined){
            res.redirect("/perfil_page");
        }
        else{
            Veiculo.findOne({
                where: {
                    id_perfil: id
                }
            }).then((veiculos)=>{
                if(veiculos == undefined){
                    res.redirect("/vehicle_page");
                }
                else{
                    res.render("data-page", {usuario});
                }
            })
        }
    })
})

app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Erro ao encerrar a sessão:", err);
            res.status(500).send("Erro ao fazer logout.");
        } else {
            res.redirect('/login_page'); // Redireciona para a página de login após o logout
        }
    });
});

app.listen(3000,()=>{
    console.log("SERVIDOR RODANDO");
})


// Get your endpoint online with a reserved domain
// ngrok.connect({ 
//     addr: 3000, 
//     authtoken_from_env: true,
//     // proto: `http`,
//     domain: 'shining-bear-helped.ngrok-free.app' // substitua por seu domínio reservado
// }).then(listener => console.log(`Ingress established at: ${listener.url()}`));

// ngrok.connect({
//     addr: 3000, 
//     authtoken_from_env: true,
//     schemes: "http",
//     domain: 'shining-bear-helped.ngrok-free.app' // substitua por seu domínio reservado
// }).then(listener => console.log(`Ingress established at: ${listener.url()}`));