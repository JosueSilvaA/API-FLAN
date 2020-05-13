var express = require('express');
var router = express.Router();
var pagina = require('../models/pagina');
var mongoose = require('mongoose');

//agregar una nueva pagina
router.post('/',function(req,res){
    let p = new pagina(
        {
            titulo: req.body.titulo,
            descripcion:req.body.descripcion,
            palabrasClave:'',
            paginaPadre:'',
            encabezado:'',
            piePagina:'',
            contenido:[],
            posts:[],
            imagenes:[],
            videos:[],
            documentos:[],
            visualizacion:req.body.visualizacion,
            estado:req.body.estado
        }
    );
    p.save().then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});

//Obtener todas las paginas
router.get('/',function(req,res){
    pagina.find().then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});

//Editar una pagina

router.put('/:idPagina',function(req,res){
    pagina.update(
        {_id:req.params.idPagina},
        {
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            paginaPadre: req.body.paginaPadre,
            encabezado: req.body.encabezado,
            piePagina: req.body.piePagina
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});

//Cambiar el estado de visualizacion de la pagina
router.put('/:idPagina/visualizacion',function(req,res){
    pagina.update(
        {_id:req.params.idPagina},
        {
            visualizacion: req.body.visualizacion
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});

//cambiar de estado una pagina
router.put('/:idPagina/estado',function(req,res){
    pagina.update(
        {_id:req.params.idPagina},
        {
            estado: req.body.estado
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});


module.exports = router;