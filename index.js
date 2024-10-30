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
const Reserva = require('./cont_reserv/Reserva');
const ControleReserva = require('./cont_reserv/controlReserva');
const session = require('express-session');
const adminAut = require('./middleware/adminAutoriz'); /* -------- MNADA PROS BAGULHO */
const { where } = require('sequelize');
// teste
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

app.get("/data_page", (req, res)=>{
    res.render("data-page");
})




app.post("/reserva_vaga", (req, res) => {
    let date = req.body.date;
    let time = req.body.time;
    let vagasStatus = []; // Array para armazenar o status de cada vaga

    // Busca todas as vagas em ordem crescente de id_vaga
    Vaga.findAll({
        order: [['id_vaga', 'ASC']]
    }).then((vagas) => {
        const promises = vagas.map((vaga) => {
            return Reserva.findOne({
                where: {
                    data_reserva: date,
                    prev_chegada: time,
                    id_vaga: vaga.id_vaga
                }
            }).then((reserva) => {
                vagasStatus.push({
                    id_vaga: vaga.id_vaga,
                    tipo_vaga: vaga.tipo_vaga,
                    numero: vaga.numero,
                    status: reserva ? "ocupado" : "vazio"
                });
            });
        });

        // Aguarda todas as Promises antes de renderizar a página
        Promise.all(promises).then(() => {
            // Ordena o array vagasStatus por id_vaga, para garantir a ordem correta
            vagasStatus.sort((a, b) => a.id_vaga - b.id_vaga);

            res.render("park/park-page", { vagasStatus });
        }).catch((error) => {
            console.error("Erro ao buscar status das reservas:", error);
            res.status(500).send("Erro ao processar os dados.");
        });
    }).catch((error) => {
        console.error("Erro ao buscar vagas:", error);
        res.status(500).send("Erro ao buscar as vagas.");
    });
});

app.listen(3000,()=>{
    console.log("SERVIDOR RODANDO");
})