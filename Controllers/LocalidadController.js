//CREATE: /api/localidades        METODO: POST
//EDIT: /api/localidades /: id    METODO: PUT
//DELETE / api / localidades /: id     METODO: DELETE
//READ / api / localidades            METODO: GET     //Con departamentos asociadas a ella.



const handleFatalError = require("../_helpers/handleFatalError");
const LocalidadModel = require("../Models/Localidad");
const DepartamentoModel = require("../Models/Departamento");


var LocalidadController = {
    
    create: function (request, response) {
        const body = request.body;

        LocalidadModel.create({ name: body.nombre ,DepartamentoId: body.departamentoID}).then(() => {
            response.status(201).send({ msg: 'Localidad creada correctamente!' }); 
 
        }).catch((err) => {
            handleFatalError(err);
            response.status(500).send("Ha ocurrido un error!");
        });

    },
 

    editById: async function (request, response) {
        const ID_LOCALIDAD = request.params.id;
        const body = request.body;


        LocalidadModel.update({ name: body.nombre, DepartamentoId: body.departamentoID }, { where: { id: ID_LOCALIDAD } }).then((result) => {
            if (result[0] == 0) {
                response.status(400).send("Localidad que intentas editar no existe");

            } else if (result[0] == 1) {
                response.status(200).send({ msg: 'Localidad actualizada correctamente!' });
            }

        }).catch((err) => {
            handleFatalError(err);
            response.status(500).send("Ha ocurrido un error!");
        })

    }, 

    deleteById: async function (request, response) {
        const ID_LOCALIDAD = request.params.id;
        LocalidadModel.destroy({ where: { id: ID_LOCALIDAD } }).then((result) => {
            if (result === 0) {
                response.status(400).send("Localidad que intentas eliminar no existe!");
            } else if (result == 1) {
                response.status(200).send({ msg: "Localidad eliminado correctamente" });
            }

        }).catch((error) => {
            handleFatalError(error);
            response.status(500).send("Ha ocurrido un error!")
        })
    },


    getAll: async function (request, response) {
        LocalidadModel.findAll({include: [DepartamentoModel]}).then((localidades) => {
            response.status(200).send(localidades);
        }).catch((err) => { 
            handleFatalError(err);
            response.status(500).send("Ha ocurrido un error")
        })

    },

    getById: async function (request, response) {
        const ID_LOCALIDAD = request.params.id;
        LocalidadModel.findOne({ where: { id: ID_LOCALIDAD }, include: [DepartamentoModel] }).then((localidad) => {
            response.status(200).send(localidad); 

        }).catch((err) => {

            handleFatalError(err);
            response.status(500).send("Ha ocurrido un error")
        })

    },


}

module.exports = LocalidadController;