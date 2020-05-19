var express = require('express');
var router = express.Router();
var usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY ='secretkey123456';

router.post('/',function(req,res){
    userData ={
        correo: req.body.correo,
        contrasena:req.body.contrasena
    }
    usuario.findOne(
        {
            correo: userData.correo
        },
        {_id:true,nombres:true,contrasena:true}
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});

// router.post('/',function(req,res){
//     userData ={
//         correo: req.body.correo,
//         contrasena:req.body.contrasena
//     }
//     usuario.findOne(
//         {
//             correo: userData.correo
//         },
//         {_id:true,nombres:true,contrasena:true}
//     ).then(result=>{
//         if(!result){
//             //usuario no existe
//             res.send({mensaje:'-1',resultado:result});
//             res.end();
//         }else{
//             const resultContrasena = bcrypt.compareSync(userData.contrasena, result.contrasena)
//             if(resultContrasena){
//                 const expiresIn = 24*60*60;
//                 const accessToken = jwt.sign({id:result._id},SECRET_KEY,{expiresIn:expiresIn}); 
//                 const dataUser ={
//                     id:result._id,
//                     nombres:result.nombres,
//                     accessToken:accessToken,
//                     expiresIn:expiresIn
//                 }
//                 res.send(result);
//                 res.end();
//             }else{
//                 //contraseña  incorrecta
//                 res.send({mensaje:'incorrecta',resultado:result});
//                 res.end();
//             }    
//         }
//     }).catch(error=>{
//         res.send(error);
//         res.end();
//     });
// });

module.exports = router;