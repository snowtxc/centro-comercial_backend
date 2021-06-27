const jwt = require("jsonwebtoken");

const UserModel = require("../Models/User");
const handleFatalError = require("../_helpers/handleFatalError");

function isAdmin(request, response, next) {

    const IDUSER = request.userID;

    UserModel.findOne({where: {id:IDUSER,isAdmin: 1}}).then((result) =>{   //SELECT USERS ADMINISTRADORES CON ESA ID
        if(!result){
            response.status(409).send("Not authorization!");
        }
         
        next();

    }).catch((err) =>{
        handleFatalError(err);
        response.status(409).send("Not authorization");
    })
    


}

module.exports = isAdmin;