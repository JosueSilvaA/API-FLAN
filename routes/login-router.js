var express = require('express');
var router = express.Router();
var usuario = require('../models/usuario');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var SECRET_KEY ='secretkey123456';

router.post('/',function(req,res){
    console.log("body",req.body)
    userData ={
        correo: req.body.correo,
        contra:req.body.contra
    }
    usuario.findOne(
        {correo:userData.correo}
    ).then(result=>{
        if(!result){
            //usuario no existe
            res.send({mensaje:'-1',resultado:result});
        }else{
            console.log("xxxx",req.body.contra)
            console.log("xx",result.contrasena)
            const resultContrasena = bcrypt.compareSync(userData.contra, result.contrasena,function(error,res){
                console.log('RESPUESTA',res);
                console.log('ERROR',error);
            })
            console.log('contrasena',resultContrasena)
            if(resultContrasena){
                const expiresIn = 24*60*60;
                const accessToken = jwt.sign({id:result._id},SECRET_KEY,{expiresIn:expiresIn}); 
                const dataUser ={
                    id:result._id,
                    nombres:result.nombres,
                    accessToken:accessToken,
                    expiresIn:expiresIn
                }
                console.log("DATA",dataUser)
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