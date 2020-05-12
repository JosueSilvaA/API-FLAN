var mongoose = require('mongoose');

var esquema = mongoose.Schema(
    {
        favicon: String,
        logo:String,
        titulo:String,
        descripcion:String,
        estilos:String,
        imagenes:Array,
        videos:Array,
        documentos:Array,
        visibilidad:String
    }
);

module.exports = mongoose.model('paginaprincipal',esquema);