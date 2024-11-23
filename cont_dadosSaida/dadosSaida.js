const Sequelize = require("sequelize");
const conexao = require('../database/basedados');
const Vaga = require("../cont_park/Park");

dadosSaida = conexao.define('dados_saida', {
    id_dados:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    data_chegada:{
        type: Sequelize.DATEONLY,
        allowNull: true,
    },
    tempo_chegada: {
        type: Sequelize.TIME,
        allowNull: true,
    },
    id_vaga:{
        type: Sequelize.INTEGER,
        allowNull: true,
    },
});

Vaga.hasMany(dadosSaida, {
    foreignKey: "id_vaga"
});
dadosSaida.belongsTo(Vaga, {
    foreignKey: "id_vaga",
    as: "vaga"
});

module.exports = dadosSaida;
dadosSaida.sync();