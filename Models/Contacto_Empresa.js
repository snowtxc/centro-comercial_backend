const conexion = require("../database");
const { DataTypes } = require("sequelize");


const Contacto_Empresa_Model = conexion.define("ContactoEmpresa", {

    relacion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
});


module.exports = Contacto_Empresa_Model;