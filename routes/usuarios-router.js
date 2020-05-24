var express = require('express');
var router = express.Router();
var usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');


//guardar un usuario
router.post('/',function(req,res){
    let u = new usuario(
        {
            nombres: req.body.nombres,
            apellidos:req.body.apellidos,
            correo:req.body.correo,
            usuario:req.body.usuario,
            contrasena:bcrypt.hashSync(req.body.contrasena),
            direccion:req.body.direccion,
            telefono:req.body.telefono,
            foto_perfil:'',
            rol:'5ebb4bf7033d1300171f926d'
        }
    );
    u.save().then(result=>{
        res.send({codigoResultado:1,mensaje:'registro guardado',usuarioGuardado:result});
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end(); 
    });
    
});
//obtener los usuarios por rol
router.get('/:rol',function(req,res){
    usuario.find({rol:req.params.rol}).then(result=>{
        res.send({codigoResultado:1,mensaje:'Todos los usuarios',usuarios:result});
        res.end();
    }).catch(error =>{
        res.send(error);
        res.end();
    });
})

//obtener un solo usuario
router.get('/:idUsuario/usuario',function(req,res){
    usuario.find({_id:req.params.idUsuario}).then(result=>{
        res.send(result[0]);
        res.end();
    }).catch(error =>{
        res.send(error);
        res.end();
    });
})

//obtener todos lo usuarios
router.get('/',function(req,res){
    usuario.find().then(result=>{
        res.send({codigoResultado:1,mensaje:'Todos los usuarios',usuarios:result});
        res.end();
    }).catch(error =>{
        res.send(error);
        res.end();
    });
    // res.send({codigoResultado:1,mensaje:'Todos los usuarios',usuarios:usuarios});
});

//actualizar un usuario
router.put('/:id',function(req,res){
    usuario.update(
        {_id:req.params.id},
        {
            correo:req.body.correo,
            usuario:req.body.usuario,
            contrasena:bcrypt.hashSync(req.body.contrasena),
            telefono: req.body.telefono
        }
    ).then(result=>{
        
        res.send(result,{'usuario':req.body.usuario});
        res.end(); 
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});

//actualizar foto de perfil usuario
router.put('/:id/fotoPerfil',function(req,res){
    usuario.update(
        {_id:req.params.id},
        {
            foto_perfil:req.body.foto_perfil
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});

//cambiar rol a un usuario
router.put('/:id/rol',function(req,res){
    usuario.update(
        {_id:req.params.id},
        {
            rol:req.body.rol
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});

//Eliminar un usuario
router.delete('/:id',function(req,res){
    usuario.remove(
        {_id:req.params.id}
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});


module.exports = router;