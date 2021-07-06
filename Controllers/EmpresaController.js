
const jwt = require("jsonwebtoken");
const handleFatalError = require("../_helpers/handleFatalError");
const sequelize = require("sequelize");

const EmpresaModel = require("../Models/Empresa");
const ContactoModel = require("../Models/Contacto");
const Contacto_Empresa_Model = require("../Models/Contacto_Empresa");
const LocalidadModel = require("../Models/Localidad");
const DepartamentoModel = require("../Models/Departamento");
const UserModel = require("../Models/User");


const checkIfEmailExist = require("../_helpers/checkIfEmailExist");
const checkIfIsImage = require("../_helpers/checkIfIsImage");
const e = require("express");


const fs  = require('fs');
var  path = require('path');
const con = require("../database");


var EmpresaController = {
    
    create: async function(request,response) {
        const body = request.body;

     

        const file  = request.files.logo;
     
        const fileName = file.name;
        const extension = fileName.split(".")[1];
        
        if(checkIfIsImage(extension)){
            let newNameFile = Math.floor(Date.now() / 1000).toString()+"."+extension;
            console.log(newNameFile);
            await file.mv("public/logos_empresas/"+newNameFile).then((err,result) =>{
                if(err){
                    response.status(500).send({msg:"Ha ocurrido un error!"});
                } 
            });

            await EmpresaModel.create({
                Nombre: body.nombre
                , razon_social: body.razon_social,
                rut: body.rut,
                Direccion: body.Direccion,
                email: body.email,
                celular: body.celular,
                telefono: body.telefono,
                nro_bps: body.nro_bps,
                nro_referencia: body.nro_referencia,
                rubro: body.rubro,
                rubro_secundario: body.rubro_secundario,
                fecha_afiliacion: body.fecha_afiliacion,
                fecha_inicio_empresa: body.fecha_inicio_empresa,
                estado: body.estado, 
                url_logo: newNameFile,
                observaciones: body.observaciones,
                LocalidadId: body.LocalidadId

            }).then(async (empresaRegistrada) => {
                const idEmpresaRegister = empresaRegistrada.dataValues.id;
                await UserModel.create({ email: body.user_email, password: body.user_password, username: body.nombre_usuario, isAdmin: false, EmpresaId: idEmpresaRegister });


                response.status(201).send({ msg: 'Empresa creada correctamente!' });

            }).catch((err) => {
                handleFatalError(err);
                response.status(500).send({msg:"Ha ocurrido un error"});
            });


        }else{
            response.status(409).send({ msg: "Archivo invalido" });
        }
    },

    editById: async function (request, response) {
        const ID_EMPRESA = request.params.id;
        
        

        const body = request.body;
        let file;
         if(request.files){
             file = request.files.logo;
         }

        if(file){
            const fileName = file.name;
            const extension = fileName.split(".")[1];
            if (checkIfIsImage(extension)) {
                let newNameFile = Math.floor(Date.now() / 1000).toString() + "." + extension;
                console.log(newNameFile);
                await file.mv("public/logos_empresas/" + newNameFile).then((err, result) => {
                    if (err) {
                        response.status(500).send({ msg: "Ha ocurrido un error!" });
                    }
                });

                EmpresaModel.update({
                    Nombre: body.nombre
                    , razon_social: body.razon_social,
                    rut: body.rut,
                    Direccion: body.Direccion,
                    email: body.email,
                    celular: body.celular,
                    telefono: body.telefono,
                    nro_bps: body.nro_bps,
                    nro_referencia: body.nro_referencia,
                    rubro: body.rubro,
                    rubro_secundario: body.rubro_secundario,
                    fecha_afiliacion: body.fecha_afiliacion,
                    fecha_inicio_empresa: body.fecha_inicio_empresa,
                    estado: body.estado,
                    url_logo: newNameFile,
                    observaciones: body.observaciones
                }, { where: { id: ID_EMPRESA } }).then((result) => {
                    if (result[0] == 0) {
                        response.status(400).send({ msg: "Empresa que intentas editar no existe con ese id" });
                    } else if (result[0] == 1) {
                        response.status(200).send({ msg: 'Empresa actualizada correctamente!' });
                    }

                }).catch((err) => {
                    handleFatalError(err);
                    response.status(500).send({ msg: "Ha ocurrido un error!" });
                })
            }else{
                response.status(409).send({ msg: "Archivo invalido" });
            }

        }else{
            EmpresaModel.update({
                Nombre: body.nombre
                , razon_social: body.razon_social,
                rut: body.rut,
                Direccion: body.Direccion,
                email: body.email,
                celular: body.celular,
                telefono: body.telefono,
                nro_bps: body.nro_bps,
                nro_referencia: body.nro_referencia,
                rubro: body.rubro,
                rubro_secundario: body.rubro_secundario,
                fecha_afiliacion: body.fecha_afiliacion,
                fecha_inicio_empresa: body.fecha_inicio_empresa,
                estado: body.estado,
                observaciones: body.observaciones
            },
                {
                    where: { id: ID_EMPRESA }
                }).then((result) => {
                    if (result[0] == 0) {
                        response.status(400).send({ msg: "Empresa que intentas editar no existe con ese id" });
                    } else if (result[0] == 1) {

                        response.status(200).send({ msg: 'Empresa actualizada correctamente!' });
                    }

                }).catch((err) => {
                    handleFatalError(err);
                    response.status(500).send({ msg: "Ha ocurrido un error!" });
                })
        }
    },



    deleteById: async function (request, response) {
        const ID_EMPRESA = request.params.id;
        EmpresaModel.destroy({ where: { id: ID_EMPRESA } }).then((result) => {
            if (result === 0) {
                response.status(400).send({msg:"Empresa que intentas eliminar no existe con ese id!"});
            } else if (result == 1) {
                response.status(200).send({ msg: "Empresa eliminada correctamente" });
            }
        }).catch((error) => {
            handleFatalError(error);
            response.status(500).send({msg:"Ha ocurrido un error!"});
        })
    },


    getAll: async function (request, response) {
        EmpresaModel.findAll({ include: [{model: ContactoModel} ,{model: LocalidadModel, include: DepartamentoModel}] }).then((empresas) => {
            response.status(200).send(empresas);
        }).catch((err) => {

            handleFatalError(err);
            response.status(500).send({msg: "Ha ocurrido un error"});

        })

    }, 

    getById: async function (request, response) {
        const ID_EMPRESA = request.params.id;
        EmpresaModel.findOne({ where: { id: ID_EMPRESA }, include: [ {model: ContactoModel} , {model: LocalidadModel,include: {model: DepartamentoModel}},  {model: UserModel}] }).then((empresa) => {
            response.status(200).send(empresa);
        }).catch((err) => {
            handleFatalError(err);
            response.status(500).send({msg: "Ha ocurrido un error"});
        })

    },

    asociateContacto: async function(request,response){
        const empresaID = request.params.idempresa;
        const contactoID = request.params.idcontacto;
     
        const body = request.body;

        Contacto_Empresa_Model.create({ EmpresaId: empresaID, ContactoId: contactoID, relacion: body.relacion }).then(() => {
            response.status(201).send({msg: 'Contacto asociado correctamente!'});
        }).catch((err) => {
            handleFatalError(err);
            response.status(500).send({msg: "Ha ocurrido un error!"});
        })

    },

    checkEmail: function(request,response){
        const email = request.params.email;

        EmpresaModel.findOne({ where: { email: email } }).then((result) => {
            let existe = false;
            if (result) {
                existe = true;
            }

            response.status(200).send(existe); 

        })
    },

    getLogoFile: function(request,response){
        console.log("llega");
        const fileName = request.params.fileName;
        const path_file = "./public/logos_empresas/"+fileName;
      
        fs.exists(path_file, (exist) =>{
            if(exist){
                return response.sendFile(path.resolve(path_file));
            }else{
                response.status(200).send({
                    msg: 'No existe un logo para la empresa'
                })
            }
        })
    },


    getRubros: async function(request,response){
        const rubros = await con.query('SELECT DISTINCT rubro FROM empresas;', {
            model: EmpresaModel,
            mapToModel: true 
        });

        response.status(200).send(rubros);
       
    },


    getCountEmpresasByRubro: async function(request,response){
        const cantEmpresasByRubros = await con.query('SELECT rubro, count(*) as cantidad FROM empresas WHERE rubro is not null GROUP BY rubro', {
            model: EmpresaModel,
            mapToModel: true
        });

        response.status(200).send(cantEmpresasByRubros);

    },

    getCountEmpresasByEstado: async function(request,response){
        const cantEmpresasByEstado = await con.query('SELECT estado, count(*) as cantidad FROM empresas WHERE estado is not null GROUP BY estado', {
            model: EmpresaModel,
            mapToModel: true
        });

        response.status(200).send(cantEmpresasByEstado);
    },
   

   

   


}

module.exports = EmpresaController;