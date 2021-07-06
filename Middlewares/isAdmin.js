const jwt = require("jsonwebtoken");
const con = require("../database");

const UserModel = require("../Models/User");
const handleFatalError = require("../_helpers/handleFatalError");

async function isAdmin(request, response, next) {

    const IDUSER = request.userID;

    
    await UserModel.findOne({where: {id:IDUSER,isAdmin: true}}).then((result) =>{   //SELECT USERS ADMINISTRADORES CON ESA ID
        console.log(result);
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