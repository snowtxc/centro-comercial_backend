const conexion = require("./database");


const UserModel = require("./Models/User");
const LocalidadModel = require("./Models/Localidad");
const EmpresaModel  = require("./Models/Empresa");
const ContactoModel = require("./Models/Contacto");
const  DepartamentoModel = require("./Models/Departamento");
const Contacto_Empresa_Model = require("./Models/Contacto_Empresa");




//One to one.
EmpresaModel.hasOne(UserModel,{foreignKey:'EmpresaId',onDelete: 'CASCADE', onUpdate: 'CASCADE'});
UserModel.belongsTo(EmpresaModel);


//One to many.
DepartamentoModel.hasMany(LocalidadModel, { foreignKey: 'DepartamentoId', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
LocalidadModel.belongsTo(DepartamentoModel);


LocalidadModel.hasMany(EmpresaModel, { foreignKey: 'LocalidadId', onDelete: 'SET NULL', onUpdate: 'SET NULL'});
EmpresaModel.belongsTo(LocalidadModel);


//Many to many 
EmpresaModel.belongsToMany(ContactoModel, { through: 'ContactoEmpresa'});
conexion.sync()