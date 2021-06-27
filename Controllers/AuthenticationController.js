
const jwt = require("jsonwebtoken"); 
const UserModel = require("../Models/User");
const handleFatalError = require("../_helpers/handleFatalError");

var AuthenticationController = {


    validate: async function (request, response) {
        
        const body = request.body;

        const email = body.email;
        const password = body.password;

        UserModel.prototype.validateUser(email,password,(err,user) =>{
            if(err){
                handleFatalError(err);
                response.status(500).send("Ha ocurrido un error");
            }else if(!user){
                response.status(403).send("Authenticacion erronea");

            }else if(user){
        
                const token = jwt.sign(user.dataValues.id,"user_key");
                
                response.status(200).send({user: user, token: token});
            }
        })
     },


     checkEmail: function(request,response){
         const email = request.params.email;

         UserModel.findOne({where:{email: email}}).then((result) =>{
             let existe = false;
             if(result){
                 existe = true;
             }

             response.status(200).send(existe);

         })
     }

}

module.exports = AuthenticationController;