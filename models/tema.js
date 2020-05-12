var mongoose = require('mongoose');

var esquema = mongoose.Schema(
    {
        titulo:String,
        descripcion:String,
        estilos:String,
        imagenes:Array
    }
);

module.exports = mongoose.model('temas',esquema);