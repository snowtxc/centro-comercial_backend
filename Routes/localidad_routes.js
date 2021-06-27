//CREATE: /api/localidades        METODO: POST
//EDIT: /api/localidades /: id    METODO: PUT
//DELETE / api / localidades /: id     METODO: DELETE
//READ / api / localidades            METODO: GET     //Con departamentos asociadas a ella.


const router = require('express').Router();

const LocalidadController = require("../Controllers/LocalidadController");
const verifyToken = require("../Middlewares/verifiyToken");

router.post("/localidades", verifyToken, LocalidadController.create);
router.put("/localidades/:id", verifyToken, LocalidadController.editById);
router.delete("/localidades/:id", verifyToken, LocalidadController.deleteById);
router.get("/localidades",verifyToken, LocalidadController.getAll);
router.get("/localidades/:id", verifyToken,  LocalidadController.getById);





module.exports =  router;