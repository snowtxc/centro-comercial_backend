//CREATE: /api/localidades        METODO: POST
//EDIT: /api/localidades /: id    METODO: PUT
//DELETE / api / localidades /: id     METODO: DELETE
//READ / api / localidades            METODO: GET     //Con departamentos asociadas a ella.


const router = require('express').Router();

const LocalidadController = require("../Controllers/LocalidadController");


router.post("/localidades", LocalidadController.create);
router.put("/localidades/:id", LocalidadController.editById);
router.delete("/localidades/:id", LocalidadController.deleteById);
router.get("/localidades", LocalidadController.getAll);
router.get("/localidades/:id", LocalidadController.getById);





module.exports =  router;