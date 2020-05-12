var express = require('express');
var router = express.Router();
var categoria = require('../models/categoria');

//agregar categoria
router.post('/',function(req,res){
    let c = new categoria(
        {
            nombre:req.body.nombre,
            descripcion:req.body.descripcion
        }
    );
    c.save().then(result=>{
        res.send({codigoResultado:1,mensaje:'Categoria Agregada',categoria:result});
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});

//obtener todas las categorias
router.get('/',function(req,res){
    categoria.find({},{_id:true,nombre:true}).then(result=>{
        res.send({codigoResultado:1,mensaje:'Todas las Categorias',categorias:result});
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});

//actualizar una categoria
router.put('/:idCategoria',function(req,res){
    categoria.update(
        {_id:req.params.idCategoria},
        {
            nombre:req.body.nombre,
            descripcion:req.body.descripcion 
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});

//Eliminar Categoria
router.delete('/:idCategoria',function(req,res){
    categoria.remove(
        {_id:req.params.idCategoria}
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});

module.exports = router;