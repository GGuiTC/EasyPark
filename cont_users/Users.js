const Sequelize = require("sequelize");
const conexao = require('../database/basedados');

Usuario = conexao.define('usuario', {
    id_usuario:{
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
    senha:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    nivel_usuario: {
        type: Sequelize.ENUM('1', '2'),
    }
});

module.exports = Usuario;
Usuario.sync();