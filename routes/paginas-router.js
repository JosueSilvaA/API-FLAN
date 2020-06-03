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
            encabezado:req.body.encabezado,
            piePagina:req.body.piePagina,
            contenido:[],
            posts:[],
            imagenes:[],
            videos:[],
            documentos:[],
            visualizacion:req.body.visualizacion,
            tipo:req.body.tipo,
            estado:'inactiva'
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

//Obtener una pagina en especifico
router.get('/:idPagina',function(req,res){
    pagina.find({_id:req.params.idPagina}).then(result=>{
        res.send(result[0]);
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

// Eliminar una pagina

router.delete('/:idPagina',function(req,res){
    pagina.remove(
        {_id:req.params.idPagina}
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

//Agregar un nuevo contenido

router.post('/:idPagina/contenido',function(req,res){
    pagina.update(
        {
            _id: mongoose.Types.ObjectId(req.params.idPagina)
        },
        {
            $push:{
                contenido:{
                    _id:mongoose.Types.ObjectId(),
                    informacion: req.body.informacion
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

// Editar el contenido
router.put('/:idPagina/contenido/:idContenido',function(req,res){
    pagina.update(
        {
            _id: mongoose.Types.ObjectId(req.params.idPagina),
            "contenido._id":mongoose.Types.ObjectId(req.params.idContenido)
        },
        {
            $set:
            {
                "contenido.$.informacion":req.body.informacion
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

// Obtener el contenido
router.get('/:idPagina/contenido/:idContenido',function(req,res){
    pagina.find(
        {
            _id:req.params.idPagina,
            "contenido._id":mongoose.Types.ObjectId(req.params.idContenido)
        },
        {
            "contenido._id.$":true
        }
    ).then(result=>{
        res.send(result[0].contenido[0]);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});


// Eliminar un  contenido
router.delete('/:idPagina/contenido/:idContenido',function(req,res){
    pagina.update(
        {
            _id: mongoose.Types.ObjectId(req.params.idPagina),
        },
        {
            $pull:{
                contenido:
                {
                    _id:mongoose.Types.ObjectId(req.params.idContenido)
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


// crud de imagenes de la pagina principal

// Agregar imagen a la pagina
router.post('/:idPagina/imagenes',function(req,res){
    pagina.update(
        {
            _id: mongoose.Types.ObjectId(req.params.idPagina)
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

router.delete('/:idPagina/imagenes/:idImagen',function(req,res){
    pagina.update(
        {
            _id: mongoose.Types.ObjectId(req.params.idPagina)
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
router.put('/:idPagina/imagenes/:idImagen',function(req,res){
    pagina.update(
        {
            _id: mongoose.Types.ObjectId(req.params.idPagina),
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


///////////editar la url
router.put('/:idPagina/imagenes/:idImagen/imagen',function(req,res){
    pagina.update(
        {
            _id: mongoose.Types.ObjectId(req.params.idPagina),
            "imagenes._id":mongoose.Types.ObjectId(req.params.idImagen)
        },
        {
            $set:
            {
                "imagenes.$.url":req.body.url
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

// Obtener la imagen
router.get('/:idPagina/imagenes/:idImagen',function(req,res){
    pagina.find(
        {
            _id:req.params.idPagina,
            "imagenes._id":mongoose.Types.ObjectId(req.params.idImagen)
        },
        {
            "imagenes._id.$":true
        }
    ).then(result=>{
        res.send(result[0].imagenes[0]);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});

// crud de videos pagina principal

//agregar video a la pagina principal
router.post('/:idPagina/videos',function(req,res){
    pagina.update(
        {
            _id: mongoose.Types.ObjectId(req.params.idPagina)
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

router.post('/:idPagina/videos/:idVideo',function(req,res){
    pagina.update(
        {
            _id: mongoose.Types.ObjectId(req.params.idPagina)
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
router.put('/:idPagina/videos/:idVideo',function(req,res){
    pagina.update(
        {
            _id: mongoose.Types.ObjectId(req.params.idPagina),
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
router.post('/:idPagina/documentos',function(req,res){
    pagina.update(
        {
            _id: mongoose.Types.ObjectId(req.params.idPagina)
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

router.post('/:idPagina/documentos/:idDocumento',function(req,res){
    pagina.update(
        {
            _id: mongoose.Types.ObjectId(req.params.idPagina)
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
router.put('/:idPagina/documentos/:idDocumento',function(req,res){
    pagina.update(
        {
            _id: mongoose.Types.ObjectId(req.params.idPagina),
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

//agregar post
router.post('/:idPagina/posts/:idpost',function(req,res){
    pagina.update(
        {
            _id: mongoose.Types.ObjectId(req.params.idPagina)
        },
        {
            $push:{
                posts:
                {
                    _id:mongoose.Types.ObjectId(req.params.idpost)
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

//eliminar un post
router.delete('/:idPagina/posts/:idpost',function(req,res){
    pagina.update(
        {
            _id: mongoose.Types.ObjectId(req.params.idPagina)
        },
        {
            $pull:{
                posts:
                {
                    _id:mongoose.Types.ObjectId(req.params.idpost)
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

module.exports = router;