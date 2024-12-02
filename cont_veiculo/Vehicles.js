const Sequelize = require("sequelize");
const conexao = require('../database/basedados');
const Perfil = require('../cont_perfil/Perfil')

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
    id_perfil: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

Perfil.hasMany(Veiculo, {
    foreignKey: "id_perfil"
});
Veiculo.belongsTo(Perfil, {
    foreignKey: "id_perfil",
    as: "perfil"
});

module.exports = Veiculo;
Veiculo.sync();