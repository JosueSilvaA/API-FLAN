var mongoose = require('mongoose');
var esquema = mongoose.Schema({
    nombre:String,
    descripcion:String
});

module.exports = mongoose.model('categorias',esquema);