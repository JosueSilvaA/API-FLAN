var express = require('express');
var router = express.Router();
var tema = require('../models/tema');
var mongoose = require('mongoose');
//Agregar un tema
router.post('/',function(req,res){
    let t = new tema(
        {
            titulo:req.body.titulo,
            descripcion:req.body.descripcion,
            estilos:req.body.estilos,
            imagenes:[]
        }
    );
    t.save().then(result=>{
        res.send({codigoResultado:1,mensaje:'Tema agregado',tema:result});
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});

// Agregar imagen al tema
router.post('/:idTema/imagenes',function(req,res){
    tema.update(
        {
            _id: mongoose.Types.ObjectId(req.params.idTema)
        },
        {
            $push:{
                imagenes:
                {
                    _id:mongoose.Types.ObjectId(),
                    nombreImagen:req.body.nombreImagen,
                    descripcion:req.body.descripcion,
                    url:req.body.url
                }
            }
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});
// Eliminar imagen del tema

router.post('/:idTema/imagenes/:idImagen',function(req,res){
    tema.update(
        {
            _id: mongoose.Types.ObjectId(req.params.idTema)
        },
        {
            $pull:{
                imagenes:
                {
                    _id:mongoose.Types.ObjectId(req.params.idImagen)
                }
            }
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});

// Editar una imagen
router.put('/:idTema/imagenes/:idImagen',function(req,res){
    tema.update(
        {
            _id: mongoose.Types.ObjectId(req.params.idTema),
            "imagenes._id":mongoose.Types.ObjectId(req.params.idImagen)
        },
        {
            $set:
            {
                "imagenes.$.nombreImagen":req.body.nombreImagen ,
                "imagenes.$.descripcion":req.body.descripcion
            }
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});


//Obtener todos los temas
router.get('/',function(req,res){
    tema.find().then(result=>{
        res.send({codigoResultado:1,mensaje:'Todos los temas',temas:result});
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});

// Obtener todas las imagenes de un tema

router.get('/:idTema/imagenes',function(req,res){
    tema.find(
        { _id:req.params.idTema},
        { _id:true,imagenes:true}
    ).then(result=>{
        res.send(result[0]);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});

// Obtener toda la informacion de un tema

router.get('/:idTema',function(req,res){
    tema.find(
        { _id:req.params.idTema},
    ).then(result=>{
        res.send(result[0]);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});

//Actualizar un tema
router.put('/:idTema',function(req,res){
    tema.update(
        {_id:req.params.idTema},
        {
            titulo:req.body.titulo,
            descripcion:req.body.descripcion,
            estilos:req.body.estilos,  
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});

//Eliminar un tema
router.delete('/:idTema',function(req,res){
    tema.remove(
        {_id:req.params.idTema}
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });;
});

module.exports = router;