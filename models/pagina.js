var mongoose = require('mongoose');

var esquema = mongoose.Schema(
    {
        titulo:String,
        descripcion:String,
        paginaPadre:String,
        encabezado:String,
        piePagina:String,
        contenido:Array,
        posts:Array,
        imagenes:Array,
        videos:Array,
        documentos:Array,
        visualizacion:String,
        tipo:String,
        estado:String
    }
);

module.exports = mongoose.model('pagina',esquema);