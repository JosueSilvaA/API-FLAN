var express = require('express');
var router = express.Router();
var post = require('../models/post');
var mongoose = require('mongoose');

// Agregar un post
router.post('/',function(req,res){
    let p =new post(
        {
            titulo:req.body.titulo,
            autor:req.body.autor,
            fecha:req.body.fecha,
            hora:req.body.hora,
            contenido:req.body.contenido,
            imagen:req.body.imagen,
            categoria:req.body.categoria,
            opcionComentario:req.body.opcionComentario,
            comentarios:[]
        }
    );
    p.save().then(result=>{
        res.send({codigoResultado:1,mensaje:'Post Agregado',post:result});
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});

// Agregar comentarios a un post

router.post('/:idPost/comentarios',function(req,res){
    post.update(
        {
            _id:mongoose.Types.ObjectId(req.params.idPost)
        },
        {
            $push:{
                comentarios:
                {
                    _id:mongoose.Types.ObjectId(),
                    descripcion:req.body.descripcion,
                    usuario:mongoose.Types.ObjectId(req.body.usuario),
                    fecha:req.body.fecha
                }
            }
        }
    ).then(result=>{
        res.send(result);
        res.end()
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});


// Eliminar un comentario
router.post('/:idPost/comentarios/:idComentario',function(req,res){
    post.update(
        {
            _id:mongoose.Types.ObjectId(req.params.idPost)
        },
        {
            $pull:{
                comentarios:
                {
                    _id:mongoose.Types.ObjectId(req.params.idComentario),
                }
            }
        }
    ).then(result=>{
        res.send(result);
        res.end()
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});

//Obtener todos los posts

router.get('/',function(req,res){
    post.find()
    .then(result=>{
        res.send({codigoResultado:1,mensaje:'Todos los posts',posts:result});
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});


//Eliminar un post

router.delete('/:idPost',function(req,res){
    post.remove(
        {_id:req.params.idPost}
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});

module.exports = router;