const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Veiculo = require('./Vehicles');

const adminAut = require('../middleware/adminAutoriz');

router.use(bodyParser.urlencoded({extended: true}));

router.get("/vehicle_page", adminAut, (req,res)=>{
    id_usuario = req.session.usuario.id;
    Veiculo.findAll({
        where: {id_usuario: id_usuario}
    }).then((veiculo)=>{
        res.render("vehicles/vehicles-page", { veiculo });
    })
})

router.get("/cadastro-veiculos", adminAut, (req,res)=>{
    id_usuario = req.session.usuario.id;
    res.render("vehicles/cadastro-vehicles", {id_usuario});
})

router.post("/cadastro_veiculo", (req,res)=>{
    let id_usuario = req.body.id
    let tipo_veiculo = req.body.tipo
    let marca = req.body.marca
    let modelo = req.body.modelo
    let cor = req.body.cor
    let placa = req.body.placa
    Veiculo.create({
        id_usuario: id_usuario,
        tipo_veiculo: tipo_veiculo,
        marca: marca,
        modelo: modelo,
        cor: cor,
        placa: placa
    }).then(()=>{
        res.redirect("/vehicle_page")
    })
})

router.post("/deleta-vehicle", (req, res)=>{
    var id = req.body.id;
    Veiculo.destroy({
        where:{
            id_veiculo:id
        }
    }).then(()=>{
        res.redirect("/vehicle_page")
    })
})

router.get("/edita-vehicle/:id", adminAut, (req,res)=>{
    let id = req.params.id;
    Veiculo.findByPk(id).then((veiculo)=>{
        res.render("vehicles/alte_vehicle", {veiculo})
    })
})

router.post("/updateveiculo",(req, res)=>{
    id_veiculo = req.body.id;
    tipo = req.body.tipo
    marca = req.body.marca
    modelo = req.body.modelo
    cor = req.body.cor
    placa = req.body.placa
    Veiculo.update(
        {
            tipo_veiculo: tipo,
            marca: marca,
            modelo: modelo,
            cor: cor,
            placa: placa
        }, 
        {where:{id_veiculo :id_veiculo}}
    ).then(()=>{
        res.redirect("/vehicle_page")
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