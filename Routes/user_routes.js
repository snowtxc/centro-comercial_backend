




const router = require('express').Router();

const UserController = require("../Controllers/UserController");
const verifyToken = require('../Middlewares/verifiyToken');


router.get("/user/info", verifyToken , UserController.getById);




module.exports = router;