//CREATE: /api/contactos         METODO: POST
//EDIT: /api/contactos /: id    METODO: PUT
//DELETE / api / contactos /: id     METODO: DELETE
///READ   / api / contactos           METODO: GET     //Con empresa asociadas a cada una de ellas.
// READ    /api/contactos: id      METODO: GET      
// READ   /api/contactos/:id/empresas  METODO: GET    //Informacion contactos con empresas asociadas




const { request } = require("express");
const jwt = require("jsonwebtoken");
const handleFatalError = require("../_helpers/handleFatalError");






var ContactoController = {

    create: function (request, response) {

    },

    editById: async function (request, response) {

    },

    deleteById: async function (request, response) {

    },

    getAll: async function (request, response) {

    },

    getById: async function (request, response) {

    },

    getEmpresasByContactId: async function(request,response){

    }

}

module.exports = ContactoController;