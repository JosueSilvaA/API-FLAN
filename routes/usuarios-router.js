var express = require('express');
var router = express.Router();
var usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY ='secretkey123456';

//guardar un usuario
router.post('/',function(req,res){
    let u = new usuario(
        {
            nombres: req.body.nombres,
            apellidos:req.body.apellidos,
            correo:req.body.correo,
            usuario:req.body.usuario,
            contrasena:bcrypt.hashSync(req.body.contrasena),
            rol:req.body.rol
        }
    );
    u.save().then(result=>{
        const expiresIn = 24*60*60;
        const accessToken = jwt.sign({id:result._id},SECRET_KEY,{expiresIn:expiresIn});
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
            nombres: req.body.nombres,
            apellidos:req.body.apellidos,
            correo:req.body.correo,
            usuario:req.body.usuario,
            contrasena:req.body.contrasena,
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

router.post('/login',function(req,res){
    usuario.findOne(
        {
            correo:req.body.correo
        },
        {_id:true,nombres:true,contrasena:true}
    ).then(result=>{
        if(!result){
            //usuario no existe
            res.send({mensaje:'-1',resultado:result});
            
        }else{
            res.send(result);
            
        }
    }).catch(error=>{
        res.send(error);
        res.end();
    });
})

module.exports = router;