var mongoose = require('mongoose');

var esquema = mongoose.Schema(
    {
        titulo:String,
        descripcion:String,
        palabraClave:String,
        paginaPadre:String,
        encabezado:String,
        piePagina:String,
        contenido:Array,
        posts:Array,
        imagenes:Array,
        videos:Array,
        documentos:Array,
        visualizacion:String,
        estado:String
    }
);

module.exports = mongoose.model('pagina',esquema);