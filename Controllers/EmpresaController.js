// CREATE: /api/empresas   METODO: POST
// EDIT: /api/empresas /: id    METODO: PUT
// DELETE / api / empresas /: id     METODO: DELETE
// READ / api / empresas        METODO: GET     //Con contactos asociados a cada una de ellas.
// READ / api / empresas /: id         METODO: GET


const jwt = require("jsonwebtoken");
const handleFatalError = require("../_helpers/handleFatalError");

const EmpresaModel = require("../Models/Empresa");
const ContactoModel = require("../Models/Contacto");



var EmpresaController = {

    create: function(request,response) {
        
        const body = request.body;
        EmpresaModel.create({Nombre: body.nombre
            ,razon_social: body.razon_social,
            rut: body.rut, 
            Direccion: body.Direccion,
            email: body.email,
            celular: body.celular, 
            telefono: body.telefono, 
            nro_bps: body.nro_bps, 
            nro_referencia : body.nro_referencia ,
            rubro: body.rubro,  
            rubro_secundario: body.rubro_secundario,
            fecha_afiliacion: body.fecha_afiliacion, 
            fecha_inicio_empresa: body.fecha_inicio_empresa,
            estado: body.estado, url_logo: body.url_logo,
            observaciones: body.observaciones
        
        }).then(() =>{
            response.status(201).send({msg: 'Empresa creada correctamente!'});

        }).catch((error) =>{
            handleFatalError(err);
            response.status(500).send("Ha ocurrido un error");
        });

    },

    editById: async function (request, response) {
        const ID_EMPRESA = request.params.id;
        const body = request.body;

        EmpresaModel.update({
            Nombre: body.nombre
            , razon_social: body.razon_social,
            rut: body.rut,
            Direccion: body.Direccion,
            email: body.email,
            celular: body.celular,
            telefono: body.telefono,
            nro_bps: body.nro_bps,
            nro_referencia: body.nro_referencia,
            rubro: body.rubro,
            rubro_secundario: body.rubro_secundario,
            fecha_afiliacion: body.fecha_afiliacion,
            fecha_inicio_empresa: body.fecha_inicio_empresa,
            estado: body.estado, url_logo: body.url_logo,
            observaciones: body.observaciones
        },
        
        { where: { id: ID_EMPRESA } 
         }).then((result) => {
            if (result[0] == 0) {
                response.status(400).send("Empresa que intentas editar no existe con ese id");
            } else if (result[0] == 1) {

                response.status(200).send({ msg: 'Empresa actualizada correctamente!' });
            }

        }).catch((err) => {
            handleFatalError(err);
            response.status(500).send("Ha ocurrido un error!");
        })
    },



    deleteById: async function (request, response) {
        const ID_EMPRESA = request.params.id;
        EmpresaModel.destroy({ where: { id: ID_EMPRESA } }).then((result) => {
            if (result === 0) {
                response.status(400).send("Empresa que intentas eliminar no existe con ese id!");
            } else if (result == 1) {
                response.status(200).send({ msg: "Empresa eliminada correctamente" });
            }
        }).catch((error) => {
            handleFatalError(error);
            response.status(500).send("Ha ocurrido un error!")
        })
    },


    getAll: async function (request, response) {
        EmpresaModel.findAll({ include: [ContactoModel] }).then((empresas) => {
            response.status(200).send(empresas);
        }).catch((err) => {

            handleFatalError(err);
            response.status(500).send("Ha ocurrido un error")

        })

    },

    getById: async function (request, response) {
        const ID_EMPRESA = request.params.id;
        EmpresaModel.findOne({ where: { id: ID_EMPRESA }, include: [ContactoModel] }).then((empresa) => {
            response.status(200).send(empresa);
        }).catch((err) => {
            handleFatalError(err);
            response.status(500).send("Ha ocurrido un error")
        })

    }
}

module.exports = EmpresaController;