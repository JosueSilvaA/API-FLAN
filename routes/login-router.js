var express = require('express');
var router = express.Router();
var usuario = require('../models/usuario');


router.get('/',function(req,res){
    usuario.find(
        {
            correo: req.body.correo,
            contrasena:req.body.contrasena
        }
    ).then(result=>{
        res.send({mensaje:"no hay nada",resultado:result});
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});

module.exports = router;