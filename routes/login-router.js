var express = require('express');
var router = express.Router();
var usuario = require('../models/usuario');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var SECRET_KEY ='secretkey123456';

router.post('/admin/:idRol',function(req,res){
    userData ={
        correo: req.body.correo,
        contra:req.body.contra
    }
    usuario.findOne(
        {correo:userData.correo,rol:req.params.idRol}
    ).then(result=>{
        console.log(result)
        if(!result){
            //usuario no existe
            res.send({mensaje:'Usuario Invalido',resultado:result});
        }else{
            const resultContrasena = bcrypt.compareSync(userData.contra, result.contrasena)
            if(resultContrasena){
                const expiresIn = 24*60*60;
                const accessToken = jwt.sign({id:result._id},SECRET_KEY,{expiresIn:expiresIn}); 
                const dataUser ={
                    id:result._id,
                    nombres:result.nombres,
                    accessToken:accessToken,
                    expiresIn:expiresIn
                }
                res.send(dataUser);
                
            }else{
                //contraseña  incorrecta
                res.send({mensaje:'incorrecta'});
            }    
        }
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});

router.post('/registrado/:idRol',function(req,res){
    userData ={
        correo: req.body.correo,
        contra:req.body.contra
    }
    usuario.findOne(
        {correo:userData.correo,rol:req.params.idRol}
    ).then(result=>{
        
        if(!result){
            //usuario no existe
            res.send({mensaje:'Usuario Invalido',resultado:result});
        }else{
            const resultContrasena = bcrypt.compareSync(userData.contra, result.contrasena)
            if(resultContrasena){
                const expiresIn = 24*60*60;
                const accessToken = jwt.sign({id:result._id},SECRET_KEY,{expiresIn:expiresIn}); 
                const dataUser ={
                    id:result._id,
                    nombres:result.nombres,
                    accessToken:accessToken,
                    expiresIn:expiresIn
                }
                res.send(dataUser);
                
            }else{
                //contraseña  incorrecta
                res.send({mensaje:'incorrecta'});
            }    
        }
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});
module.exports = router;