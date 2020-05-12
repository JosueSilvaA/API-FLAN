var express = require('express');
var router = express.Router();
var rolUsuario = require('../models/rolUsuario');

// Obtener todos los roles

router.get('/',function(req,res){
    rolUsuario.find()
    .then(result=>{
        res.send({codigoResultado:1,mensaje:'Todos los roles',roles:result});
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});

router.post('/',function(req,res){
    let r = new rolUsuario(
        {
            nombreRol:req.body.nombreRol,
            descripcion:req.body.descripcion,
            acceso:req.body.acceso
        }
    );

    r.save().then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
})

module.exports = router;