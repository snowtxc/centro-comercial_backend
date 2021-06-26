const server = require("./server");
const PORT = process.ENV | 3712;

const con = require("./database");


const relationship = require("./Relationships"); 


server.listen(PORT,function(){ 
    console.log("Servidor inciado! en el puerto:" + PORT);
})