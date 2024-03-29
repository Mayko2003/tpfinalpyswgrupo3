// import modulos
const mongoose = require('mongoose');
const Persona = require('./persona');
const { Schema } = mongoose; // para poder usar el schema de mongoose

// definir el esquema de la persona
const areaSchema = new Schema({
    nombre: { type: String, required: true },
    roles: [ {type: Schema.Types.ObjectId, ref: 'Rol'} ]
})

// exportar el esquema
module.exports = mongoose.models.Area || mongoose.model('Area', areaSchema);