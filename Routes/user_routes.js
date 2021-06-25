
const router = require('express').Router();

const UserController = require("../Controllers/UserController");


router.post("/auth/login", UserController.validate);




module.exports = router;