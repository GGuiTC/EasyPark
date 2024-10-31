const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Reserva = require('./Reserva');
const Perfil = require('../cont_perfil/Perfil')

const adminAut = require('../middleware/adminAutoriz');
const { where } = require('sequelize');

router.use(bodyParser.urlencoded({extended: true}));


router.get("/reserv_page", adminAut, (req, res) => {
    const id = req.session.usuario.id;

    Perfil.findOne({
        where: { id_usuario: id }
    }).then((perfil) => {
        const id_perfil = perfil.id_perfil;

        Reserva.findAll({
            where: { id_perfil: id_perfil },
            include: [
                { model: Vaga, as: 'vaga', attributes: ['numero'] },
                { model: Veiculo, as:'veiculo', attributes: ['marca', 'modelo', 'cor', 'placa'] }
            ]
        }).then((reservas) => {
            res.render("reserv/reserv-page", { reservas, id });
        }).catch((error) => {
            console.error("Erro ao buscar reservas:", error);
            res.status(500).send("Erro ao buscar reservas.");
        });
    }).catch((error) => {
        console.error("Erro ao buscar perfil:", error);
        res.status(500).send("Erro ao buscar perfil.");
    });
});

router.get("/reserva_vaga/:id", adminAut, (req, res)=>{
    id_vaga = req.params.id;
    res.render("reserv/reserva-vaga", { id_vaga })
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