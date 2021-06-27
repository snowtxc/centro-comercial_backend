


const router = require('express').Router();

const DepartamentoController = require("../Controllers/DepartamentoController");

//Middlewares
const verifyToken = require('../Middlewares/verifiyToken');




router.post("/departamentos", verifyToken, DepartamentoController.create);
router.put("/departamentos/:id", verifyToken, DepartamentoController.editById);
router.delete("/departamentos/:id",verifyToken,  DepartamentoController.deleteById);
router.get("/departamentos",verifyToken,DepartamentoController.getAll);
router.get("/departamentos/:id",verifyToken ,DepartamentoController.getById);





module.exports = router;