var mongoose = require('mongoose');

var esquema = new mongoose.Schema({
    nombres: String,
    apellidos: String,
    correo: {
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    usuario: String,
    contrasena: String,
    telefono:String,
    direccion:String,
    rol: mongoose.SchemaTypes.ObjectId
});

module.exports = mongoose.model('usuarios',esquema);