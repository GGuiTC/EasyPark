const Sequelize = require("sequelize");
const conexao = require('../database/basedados');

Perfil = conexao.define('perfil', {
    id_perfil:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    email:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    telefone:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    sexo: {
        type: Sequelize.ENUM('masculino', 'feminino', 'outro'),
        allowNull: true,
    },
    cpf:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    rg:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    data_nasc:{
        type: Sequelize.DATEONLY,
        allowNull: true,
    }
});

module.exports = Perfil;
Perfil.sync();