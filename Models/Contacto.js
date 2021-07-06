const conexion = require("../database");
const { DataTypes } = require("sequelize");



const ContactoModel = conexion.define("Contacto", {
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },

    Apellido : {
        type: DataTypes.STRING,
        allowNull: false
    },

    
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },

    celular: {
        type: DataTypes.STRING,
        allowNull: false
    },

    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
})


module.exports = ContactoModel;
