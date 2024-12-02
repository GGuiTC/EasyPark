const Sequelize = require("sequelize");
const conexao = require('../database/basedados');
const Vaga = require("../cont_park/Park");
const Perfil = require("../cont_perfil/Perfil");

Reserva = conexao.define('reserva', {
    id_reserva:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    prev_chegada:{
        type: Sequelize.TIME,
        allowNull: true,
    },
    data_reserva:{
        type: Sequelize.DATEONLY,
        allowNull: true,
    },
    id_vaga: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    id_veiculo: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    id_perfil: {
        type: Sequelize.INTEGER,
        allowNull: true,
    }
});


Vaga.hasMany(Reserva, {
    foreignKey: "id_vaga"
});
Reserva.belongsTo(Vaga, {
    foreignKey: "id_vaga",
    as: "vaga"
});


Perfil.hasMany(Reserva, {
    foreignKey: "id_perfil"
})
Reserva.belongsTo(Perfil, {
    foreignKey: "id_perfil",
    as: "perfil"
})

module.exports = Reserva;
Reserva.sync();