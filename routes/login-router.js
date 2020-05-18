var express = require('express');
var router = express.Router();
var usuario = require('../models/usuario');


router.get('/',function(req,res){
    usuario.findOne(
        {
            correo: req.body.correo,
            contrasena:req.body.contrasena
        },
        {_id:true,nombres:true}
    ).then(result=>{
        if(!result){
            res.send({mensaje:'-1'});
            res.end();
        }else{
            res.send({mensaje:result});
            res.end();
        }
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});

module.exports = router;