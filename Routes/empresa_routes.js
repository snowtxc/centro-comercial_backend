// CREATE: /api/empresas   METODO: POST
// EDIT: /api/empresas /: id    METODO: PUT
// DELETE / api / empresas /: id     METODO: DELETE
// READ / api / empresas        METODO: GET     //Con contactos asociados a cada una de ellas.
// READ / api / empresas /: id         METODO: GET


const router = require('express').Router();

const EmpresaController = require("../Controllers/EmpresaController");
const isAdmin = require('../Middlewares/isAdmin');


//Middlewares
const verifiyToken = require("../Middlewares/verifiyToken");

router.get('/empresas/rubros', verifiyToken,isAdmin, EmpresaController.getRubros);
router.post("/empresas",verifiyToken,isAdmin,EmpresaController.create);
router.post("/empresas/:idempresa/contactos/:idcontacto", verifiyToken,isAdmin, EmpresaController.asociateContacto);
router.put("/empresas/:id",verifiyToken, isAdmin, EmpresaController.editById);

router.delete("/empresas/:id", verifiyToken, EmpresaController.deleteById);
router.get("/empresas", verifiyToken, isAdmin, EmpresaController.getAll);
router.get("/empresas/:id", verifiyToken, EmpresaController.getById);
router.get("/empresas/check_email/:email" , verifiyToken,isAdmin, EmpresaController.checkEmail);
router.get('/empresas/getLogo/:fileName',  EmpresaController.getLogoFile);
router.get('/empresas/rubros/cantidad', verifiyToken ,isAdmin, EmpresaController.getCountEmpresasByRubro);
router.get('/empresas/estados/cantidad',verifiyToken,isAdmin  ,  EmpresaController.getCountEmpresasByEstado);






module.exports = router;