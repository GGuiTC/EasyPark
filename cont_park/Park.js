const Sequelize = require("sequelize");
const conexao = require('../database/basedados');

Vaga = conexao.define('vaga', {
    id_vaga:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    numero:{
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    status_vaga:{
        type: Sequelize.ENUM('vazio', 'reservado'),
        allowNull: true,
    },
    tipo_vaga: {
        type: Sequelize.ENUM('normal', 'pcd', 'idoso', 'autista', 'gestante'),
        allowNull: true,
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: true,
    },
    preço:{
        type: Sequelize.FLOAT,
        allowNull: true,
    },
    tempo:{
        type: Sequelize.TIME,
        allowNull: true,
    },
});

module.exports = Vaga;
Vaga.sync();