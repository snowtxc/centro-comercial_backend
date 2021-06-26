


const router = require('express').Router();

const DepartamentoController = require("../Controllers/DepartamentoController");




router.post("/departamentos",  DepartamentoController.create);
router.put("/departamentos/:id", DepartamentoController.editById);
router.delete("/departamentos/:id",  DepartamentoController.deleteById);
router.get("/departamentos",DepartamentoController.getAll);
router.get("/departamentos/:id",DepartamentoController.getById);





module.exports = router;