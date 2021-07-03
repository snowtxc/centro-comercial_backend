const jwt = require("jsonwebtoken");
const con = require("../database");

function verifyToken(request, response, next) {

    const token = request.headers.authorization;


    if (!token) {
        response.status(401).send("No authorization!");
        return
        
    }

    if (token == '') {
        response.status(401).send("No authorization!");
        return
       
    }

    const decoded = jwt.decode(token, 'user_key');

    console.log(decoded);


    if(decoded == null){
        response.status(401).send("No authorization!");
    }
     
    request.userID = decoded;
    console.log(decoded);

    next();

}

module.exports = verifyToken;