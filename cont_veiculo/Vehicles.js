const Sequelize = require("sequelize");
const conexao = require('../database/basedados');

Veiculo = conexao.define('veiculo', {
    id_veiculo:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    placa:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    modelo:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    marca:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    cor:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    tipo_veiculo: {
        type: Sequelize.ENUM('CARRO', 'MOTO', 'CAMINHÃO', 'VAN', 'MOTORHOME'),
        allowNull: false
    },
    id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

module.exports = Veiculo;
Veiculo.sync();