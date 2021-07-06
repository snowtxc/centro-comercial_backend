var express = require("express");
var bodyParser = require("body-parser");
var fileUpload = require("express-fileupload");


const app = new express(); 

//Archivos de rutas
const user_routes = require("./Routes/user_routes");
const auth_routes = require("./Routes/authentication_routes");
const localidad_routes = require("./Routes/localidad_routes");
const empresa_routes = require("./Routes/empresa_routes");
const departamento_routes = require("./Routes/departamento_routes");
const contacto_routes = require("./Routes/contacto_routes");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());  
         



//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
  

//Rutas
app.use('/api', user_routes);
app.use('/api', auth_routes);
app.use('/api', localidad_routes);
app.use('/api', empresa_routes);
app.use('/api', departamento_routes);
app.use('/api', contacto_routes);



  

//Exportacion

module.exports = app;