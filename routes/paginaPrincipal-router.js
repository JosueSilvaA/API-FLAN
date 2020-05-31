var express = require('express');
var router = express.Router();
var paginaPrincipal = require('../models/paginaPrincipal');
var mongoose = require('mongoose');
//Obtener pagina principal
router.get('/',function(req,res){
    paginaPrincipal.find().then(result=>{
        res.send(result[0]);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});

router.post('/',function(req,res){
    let p = new paginaPrincipal(
        {
            favicon:req.body.favicon,
            logo:req.body.logo,
            titulo:req.body.titulo,
            descripcion:req.body.descripcion,
            imagenes:[],
            visibilidad:req.body.visibilidad
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

//Editar pagina Principal
router.put('/:id',function(req,res){
    paginaPrincipal.update(
        { _id: mongoose.Types.ObjectId(req.params.id)},
        {
            favicon:req.body.favicon,
            logo:req.body.logo,
            titulo:req.body.titulo,
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



// crud de imagenes de la pagina principal

// Agregar imagen a la pagina
router.post('/imagenes',function(req,res){
    paginaPrincipal.update(
        {
            _id: mongoose.Types.ObjectId('5ebb57d45ed9fe2640e02c74')
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
// Eliminar imagen de la pagina

router.post('/imagenes/:idImagen',function(req,res){
    paginaPrincipal.update(
        {
            _id: mongoose.Types.ObjectId('5ebb57d45ed9fe2640e02c74')
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
router.put('/imagenes/:idImagen',function(req,res){
    paginaPrincipal.update(
        {
            _id: mongoose.Types.ObjectId('5ebb57d45ed9fe2640e02c74'),
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

// crud de videos pagina principal

//agregar video a la pagina principal
router.post('/videos',function(req,res){
    paginaPrincipal.update(
        {
            _id: mongoose.Types.ObjectId('5ebb57d45ed9fe2640e02c74')
        },
        {
            $push:{
                videos:
                {
                    _id:mongoose.Types.ObjectId(),
                    nombreVideo:req.body.nombreVideo,
                    descripcion:req.body.descripcion,
                    video:req.body.video
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
// Eliminar video de la pagina

router.post('/videos/:idVideo',function(req,res){
    paginaPrincipal.update(
        {
            _id: mongoose.Types.ObjectId('5ebb57d45ed9fe2640e02c74')
        },
        {
            $pull:{
                videos:
                {
                    _id:mongoose.Types.ObjectId(req.params.idVideo)
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

// Editar video
router.put('/videos/:idVideo',function(req,res){
    paginaPrincipal.update(
        {
            _id: mongoose.Types.ObjectId('5ebb57d45ed9fe2640e02c74'),
            "videos._id":mongoose.Types.ObjectId(req.params.idVideo)
        },
        {
            $set:
            {
                "videos.$.nombreVideo":req.body.nombreVideo ,
                "videos.$.descripcion":req.body.descripcion
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

// crud de documentos
//agregar documento a la pagina principal
router.post('/documentos',function(req,res){
    paginaPrincipal.update(
        {
            _id: mongoose.Types.ObjectId('5ebb57d45ed9fe2640e02c74')
        },
        {
            $push:{
                documentos:
                {
                    _id:mongoose.Types.ObjectId(),
                    nombreDocumento:req.body.nombreDocumento,
                    descripcion:req.body.descripcion,
                    doc:req.body.doc
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
// Eliminar video de la pagina

router.post('/documentos/:idDocumento',function(req,res){
    paginaPrincipal.update(
        {
            _id: mongoose.Types.ObjectId('5ebb57d45ed9fe2640e02c74')
        },
        {
            $pull:{
                documentos:
                {
                    _id:mongoose.Types.ObjectId(req.params.idDocumento)
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

// Editar video
router.put('/documentos/:idDocumento',function(req,res){
    paginaPrincipal.update(
        {
            _id: mongoose.Types.ObjectId('5ebb57d45ed9fe2640e02c74'),
            "documentos._id":mongoose.Types.ObjectId(req.params.idDocumento)
        },
        {
            $set:
            {
                "documentos.$.nombreDocumento":req.body.nombreDocumento ,
                "documentos.$.descripcion":req.body.descripcion
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


module.exports = router;