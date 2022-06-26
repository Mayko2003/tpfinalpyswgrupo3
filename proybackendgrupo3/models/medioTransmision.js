// import modulos
const mongoose = require('mongoose');
const Anuncio = require('./anuncio');
const { Schema } = mongoose; // para poder usar el schema de mongoose

const medioTransmisionSchema = new Schema({
    nombre: { type:String, required: true},
    url : { type: String, required: true},
    anuncio : { type : Schema.Types.ObjectId, ref: Anuncio, required: true}
})

//exportar el esquema
module.exports = mongoose.models.MedioTransmision || mongoose.model('MedioTransmision', medioTransmisionSchema);