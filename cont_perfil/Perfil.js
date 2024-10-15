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
        allowNull: false,
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    telefone:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    sexo: {
        type: Sequelize.ENUM('masculino', 'feminino', 'outro'),
    },
    cpf:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    rg:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    data_nasc:{
        type: Sequelize.DATEONLY,
        allowNull: false,
    }
});

module.exports = Perfil;
Perfil.sync();