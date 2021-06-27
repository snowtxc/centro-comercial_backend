
const router = require('express').Router();

const AuthenticationController = require("../Controllers/AuthenticationController");


//Middlewares
const verifyToken = require("../Middlewares/verifiyToken");
const isAdmin = require('../Middlewares/isAdmin'); 

router.post("/auth/login", AuthenticationController.validate);
router.get("/auth/check_email/:email",verifyToken,isAdmin,AuthenticationController.checkEmail);

 

module.exports = router;