// import modulos
const mongoose = require('mongoose');
const Persona = require('./persona');
const { Schema } = mongoose; // para poder usar el schema de mongoose

// definir el esquema de la persona
const rolSchema = new Schema({
    nombre: { type: String, required: true }
})

// exportar el esquema
module.exports = mongoose.models.Rol || mongoose.model('Rol', rolSchema);