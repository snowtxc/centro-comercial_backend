//CREATE: /api/contactos         METODO: POST
//EDIT: /api/contactos /: id    METODO: PUT
//DELETE / api / contactos /: id     METODO: DELETE
///READ   / api / contactos           METODO: GET     //Con empresa asociadas a cada una de ellas.
// READ    /api/contactos: id      METODO: GET      





const { request } = require("express");
const jwt = require("jsonwebtoken");
const handleFatalError = require("../_helpers/handleFatalError");


const ContactoModel = require("../Models/Contacto");
const EmpresaModel = require("../Models/Empresa");
const Contacto_Empresa_Model = require("../Models/Contacto_Empresa");



var ContactoController = {

    create: function (request, response) {
        const body = request.body;
        ContactoModel.create({ Nombre: body.nombre, Apellido: body.apellido, email: body.email, celular: body.celular, estado: body.estado }).then(() => {
            response.status(201).send({ msg: 'Localidad creada correctamente!' });

        }).catch((err) => {
            handleFatalError(err);
            response.status(500).send("Ha ocurrido un error!");
        });
    },


    editById: async function (request, response) {
        const ID_CONTACTO = request.params.id;
        const body = request.body;


        ContactoModel.update({ Nombre: body.nombre, Apellido: body.apellido, email: body.email,celular: body.celular }, { where: { id: ID_CONTACTO } }).then((result) => {
            if (result[0] == 0) {
                response.status(400).send("Contacto que intentas editar no existe con ese id");

            } else if (result[0] == 1) {
                response.status(200).send({ msg: 'Contacto actualizado correctamente!' });
            }

        }).catch((err) => {
            handleFatalError(err);
            response.status(500).send("Ha ocurrido un error!");
        })

    },

    deleteById: async function (request, response) {
        const ID_CONTACTO = request.params.id;
        ContactoModel.destroy({ where: { id: ID_CONTACTO } }).then((result) => {
            if (result === 0) {
                response.status(400).send("Contacto que intentas eliminar no existe con ese id!");
            } else if (result == 1) {
                response.status(200).send({ msg: "Contacto eliminado correctamente" });
            }

        }).catch((error) => {
            handleFatalError(error);
            response.status(500).send("Ha ocurrido un error!")
        })
    },


    getAll: async function (request, response) {
        ContactoModel.findAll({ include: [{  model: EmpresaModel  }] }).then(contactos =>{
            response.status(200).send(contactos);
        }).catch((err) => {
            handleFatalError(err);
            response.status(500).send("Ha ocurrido un error")
        })

    },


    getById: async function (request, response) {
        const ID_CONTACTO = request.params.id;
        ContactoModel.findOne({ where: { id: ID_CONTACTO }, include: [{
            model: EmpresaModel

        }] }).then((contacto) => {
            response.status(200).send(contacto);

        }).catch((err) => {

            handleFatalError(err);
            response.status(500).send("Ha ocurrido un error")
        })

    },

    asociateEmpresa: async function(request,response){
        
        const contactoID = request.params.idcontacto;
        const empresaID =  request.params.idempresa;

        const body = request.body;

        Contacto_Empresa_Model.create({EmpresaId: empresaID, ContactoId: contactoID, relacion: body.relacion}).then((result) =>{
            response.status(201).send({ msg: 'Empresa asociada correctamente!' });

        }).catch((err) =>{
            handleFatalError(err);
            response.status(500).send("Ha ocurrido un error!");
        })

    }


}

module.exports = ContactoController;