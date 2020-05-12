var mongoose = require('mongoose');

var esquema = mongoose.Schema({
    nombreRol:String,
    descripcion:String,
    acceso:String
});

module.exports = mongoose.model('rolesUsuarios',esquema);