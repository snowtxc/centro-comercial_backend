const conexion = require("../database");
const { DataTypes } = require("sequelize");


  
const EmpresaModel = conexion.define("Empresa", {
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
 
    razon_social: {
        type: DataTypes.STRING,
        allowNull: false,
    },
 
    rut: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    Direccion: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { 
            isEmail: true
        }
    },

    celular: {
        type: DataTypes.STRING,
        allowNull: false
    },   

    telefono: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    nro_bps: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, 
    nro_referencia: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    rubro: {
        type: DataTypes.STRING,
        allowNull: false
    },

    rubro_secundario: {
        type: DataTypes.STRING,
        allowNull: true
    },
 

    fecha_afiliacion: {
        type: DataTypes.DATE,
        allowNull: false
    },

    fecha_inicio_empresa: {
        type: DataTypes.STRING,
        allowNull: false
    },

    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },

    url_logo: {
        type: DataTypes.STRING,
        allowNull: false 
    }, 

    observaciones: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
})



module.exports = EmpresaModel;
