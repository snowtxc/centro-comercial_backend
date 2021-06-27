//CREATE: /api/contactos         METODO: POST
//EDIT: /api/contactos /: id    METODO: PUT
//DELETE / api / contactos /: id     METODO: DELETE
///READ   / api / contactos           METODO: GET     //Con empresa asociadas a cada una de ellas.
// READ    /api/contactos: id      METODO: GET      



const router = require('express').Router();

const ContactoController = require('../Controllers/ContactoController');

//Middlewares

const verifyToken = require("../Middlewares/verifiyToken");
const isAdmin  = require("../Middlewares/isAdmin");



router.post("/contactos", verifyToken, isAdmin, ContactoController.create);
router.post("/contactos/:idcontacto/empresas/:idempresa", verifyToken,isAdmin ,ContactoController.asociateEmpresa);
router.put("/contactos/:id ", verifyToken,isAdmin, ContactoController.editById);
router.delete("/contactos/:id", verifyToken, isAdmin ,ContactoController.deleteById);
router.get("/contactos", verifyToken, isAdmin, ContactoController.getAll);
router.get("/contactos/:id", verifyToken, isAdmin, ContactoController.getById);






module.exports = router;