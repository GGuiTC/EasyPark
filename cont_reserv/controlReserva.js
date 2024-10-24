const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Reserva = require('./Reserva');

const adminAut = require('../middleware/adminAutoriz');

router.use(bodyParser.urlencoded({extended: true}));

router.get("/reserv_page",adminAut,(req,res)=>{
    id = req.session.usuario.id;
    res.render("reserv/reserv-page", { id });
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