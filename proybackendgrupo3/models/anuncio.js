// import modulos
const mongoose = require('mongoose');
const { Schema } = mongoose; // para poder usar el schema de mongoose
const Estado = require('./estado');
const Recurso = require('./recurso');

const anuncioSchema = new Schema({
    titulo: { type:String, required: true },
    contenido: { type:String, required: true },
    tipoContenido: { type: String, required: true },
    fechaEntradaVigencia: { type: Date, required: true },
    fechaSalidaVigencia: { type: Date, required: true },
    tiempoLectura: { type: String, required: true },
    estados: [{ type: Estado.schema, required: true }],
    destinatarios: [{ type: Schema.Types.ObjectId, ref: 'Rol', required: true}],
    recursos: [{ type: Recurso.schema, ref: 'Recurso', required: true}],
    mediosTransmision: [{ type: String, required: true}],
    codigoQR: { type: String, required: true},
    redactor: { type: Schema.Types.ObjectId, ref: 'Persona'}
})

//exportar el esquema
module.exports = mongoose.models.Anuncio || mongoose.model('Anuncio', anuncioSchema);