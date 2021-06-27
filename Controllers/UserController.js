const EmpresaModel = require("../Models/Empresa");
const UserModel = require("../Models/User");
const handleFatalError = require("../_helpers/handleFatalError");



//   /api/users/:id
var UserController = {


    getById: function(request,response){
        const userID = 5;
        
        UserModel.findOne({where: {id: userID}, include: [EmpresaModel]}).then((user) =>{
            response.status(200).send(user);
        }).catch((err) =>{
            handleFatalError(err);
            response.status(500).send("Ha ocurrido un error");
        })

    },




}

module.exports = UserController;