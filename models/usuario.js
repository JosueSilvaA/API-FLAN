var mongoose = require('mongoose');

var esquema = new mongoose.Schema({
    nombres: String,
    apellidos: String,
    correo:  String,
    usuario: String,
    contrasena: String,
    rol: mongoose.SchemaTypes.ObjectId
});

module.exports = mongoose.model('usuarios',esquema);