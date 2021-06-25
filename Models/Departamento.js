const conexion = require("../database");
const { DataTypes } = require("sequelize");



const DepartamentoModel = conexion.define("Departamento", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    } 
})


module.exports = DepartamentoModel;
