// CREATE: /api/empresas   METODO: POST
// EDIT: /api/empresas /: id    METODO: PUT
// DELETE / api / empresas /: id     METODO: DELETE
// READ / api / empresas        METODO: GET     //Con contactos asociados a cada una de ellas.
// READ / api / empresas /: id         METODO: GET


const router = require('express').Router();

const EmpresaController = require("../Controllers/EmpresaController");


router.post("/empresas", EmpresaController.create);
router.put("/empresas/:id", EmpresaController.editById);
router.delete("/empresas/:id",EmpresaController.deleteById);
router.get("/empresas/:id",  EmpresaController.getAll);
router.get("/empresas/:id", EmpresaController.getById);





module.exports = router;