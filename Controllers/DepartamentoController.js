//CREATE: /api/departamento   METODO: POST
//EDIT: /api/departamento /: id     METODO: PUT
//DELETE / api / departamento /: id      METODO: DELETE
//READ / api / departamento            METODO: GET


const handleFatalError = require("../_helpers/handleFatalError");


const DepartamentoModel = require("../Models/Departamento");
const LocalidadModel = require("../Models/Localidad");


var DepartamentoController = {

    create: async function (request, response) {
        const body = request.body;

        DepartamentoModel.create({name:body.nombre}).then(() =>{
            response.status(201).send({msg: 'Departamento creado correctamente!'});
            
        }).catch((err) =>{
            handleFatalError(err);
            response.status(500).send("Ha ocurrido un error!");
        });
    },

    editById: async function (request, response) {
        const ID_DEPARTMENT = request.params.id;
        const body = request.body;

        console.log(ID_DEPARTMENT);

        DepartamentoModel.update({name: body.nombre},{where: {id: ID_DEPARTMENT}}).then((result) =>{
            if(result[0] == 0){
                response.status(400).send("Departamento que intentas editar no existe");
            
            }else if( result[0] == 1 ){
                response.status(200).send({ msg: 'Departamento actualizado correctamente!'});
            }

        }).catch((err) =>{
            handleFatalError(err);
            response.status(500).send("Ha ocurrido un error!");
        })

    },

    deleteById: async function (request, response) {
        const ID_DEPARTMENT = request.params.id;
        DepartamentoModel.destroy({ where: { id: ID_DEPARTMENT} }).then((result) => {
            if (result === 0) {
                response.status(400).send("Departamento que intentas eliminar no existe!");
            } else  if(result == 1){
                response.status(200).send({ msg: "Departamento eliminado correctamente" });
            }
        
        }).catch((error) => {
            handleFatalError(error);
            response.status(500).send("Ha ocurrido un error!")
        })
    },


    getAll: async function (request, response) {
        DepartamentoModel.findAll({include: [LocalidadModel]}).then((departments) =>{
            response.status(200).send(departments);
        }).catch((err) =>{ 
            handleFatalError(err);
            response.status(500).send("Ha ocurrido un error")
            
        })

    }, 

    getById: async function(request,response){
        const ID_DEPARTMENT = request.params.id;
        DepartamentoModel.findOne({where: {id: ID_DEPARTMENT}, include: [LocalidadModel]}).then((department) =>{
            response.status(200).send(department);

        }).catch((err) =>{
    
            handleFatalError(err);
            response.status(500).send("Ha ocurrido un error")
        })
        
    }
 





}

module.exports = DepartamentoController;