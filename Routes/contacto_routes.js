//CREATE: /api/contactos         METODO: POST
//EDIT: /api/contactos /: id    METODO: PUT
//DELETE / api / contactos /: id     METODO: DELETE
///READ   / api / contactos           METODO: GET     //Con empresa asociadas a cada una de ellas.
// READ    /api/contactos: id      METODO: GET      



const router = require('express').Router();

const ContactoController = require('../Controllers/ContactoController');



router.post("/contactos",  ContactoController.create);
router.put("/contactos/:id ",  ContactoController.editById);
router.delete("/contactos/:id",  ContactoController.deleteById);
router.get("/contactos",ContactoController.getAll);
router.get("/contactos/:id", ContactoController.getById);






module.exports = router;