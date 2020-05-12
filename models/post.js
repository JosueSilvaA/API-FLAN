var mongoose = require('mongoose');
var esquema = mongoose.Schema(
    {
        titulo: String,
        autor: mongoose.SchemaTypes.ObjectId,
        fecha:String,
        hora:String,
        contenido:String,
        imagen:String,
        categoria:mongoose.SchemaTypes.ObjectId,
        opcionComentario:mongoose.SchemaTypes.Number,
        comentarios:Array
    }
);

module.exports = mongoose.model('posts',esquema);