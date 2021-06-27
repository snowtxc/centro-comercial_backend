// CREATE: /api/empresas   METODO: POST
// EDIT: /api/empresas /: id    METODO: PUT
// DELETE / api / empresas /: id     METODO: DELETE
// READ / api / empresas        METODO: GET     //Con contactos asociados a cada una de ellas.
// READ / api / empresas /: id         METODO: GET


const router = require('express').Router();

const EmpresaController = require("../Controllers/EmpresaController");

//Middlewares
const verifiyToken = require("../Middlewares/verifiyToken");

router.post("/empresas",verifiyToken,EmpresaController.create);
router.post("/empresas/:idempresa/contactos/:idcontacto", verifiyToken, EmpresaController.asociateContacto);
router.put("/empresas/:id",verifiyToken, EmpresaController.editById);
router.delete("/empresas/:id", verifiyToken, EmpresaController.deleteById);
router.get("/empresas", verifiyToken, EmpresaController.getAll);
router.get("/empresas/:id", verifiyToken, EmpresaController.getById);






module.exports = router;