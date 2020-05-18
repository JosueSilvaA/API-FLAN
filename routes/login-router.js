var express = require('express');
var router = express.Router();
var usuario = require('../models/usuario');


router.get('/',function(req,res){
    usuario.findOne(
        {
            correo: req.body.correo,
            contrasena:req.body.contrasena
        }
    ).then(result=>{
        if(!result){
            res.send({mensaje:"no hay nada",resultado:result});
            res.end();
        }
        else{
            res.send('Si existe');
            res.end();
        }
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});

module.exports = router;