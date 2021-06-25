//CREATE: /api/departamento   METODO: POST
//EDIT: /api/departamento /: id     METODO: PUT
//DELETE / api / departamento /: id      METODO: DELETE
//READ / api / departamento            METODO: GET


const router = require('express').Router();

const DepartamentoController = require("../Controllers/DepartamentoController");




router.post("/departamentos",  DepartamentoController.create);
router.put("/departamentos/:id", DepartamentoController.editById);
router.delete("/departamentos/:id",  DepartamentoController.deleteById);
router.get("/departamentos/:id",DepartamentoController.getAll);
router.get("/departamentos/:id",DepartamentoController.getById);





module.exports = router;