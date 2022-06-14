// import modulos
const mongoose = require('mongoose');
const Area = require('../models/area');
const Rol = require('../models/rol');
const { Schema } = mongoose; // para poder usar el schema de mongoose

// definir el esquema de la persona
const personaSchema = new Schema({
    apellido: { type: String, required: true },
    nombre: { type: String, required: true },
    legajo: { type: Number, required: true, unique: true },
    dni: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    roles: [{ type: Schema.Types.ObjectId, ref: Rol }],
    area: { type: Schema.Types.ObjectId, ref: Area },
    nombreUsuario: { type: String, required: true, unique: true },
    contrasenia: { type: String, required: true },
    estado: { type: Boolean, default: true },
})

// exportar el esquema
module.exports = mongoose.models.Persona || mongoose.model('Persona', personaSchema);