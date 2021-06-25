const conexion = require("../database");
const { DataTypes } = require("sequelize");



const LocalidadModel = conexion.define("Localidad", {
    name: {
        type: DataTypes.STRING, 
        allowNull: false
    }
    
})


module.exports = LocalidadModel;
