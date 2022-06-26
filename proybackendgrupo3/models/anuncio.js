// import modulos
const mongoose = require('mongoose');
const { Schema } = mongoose; // para poder usar el schema de mongoose


const anuncioSchema = new Schema({
    titulo: { type:String, required: true },
    contenido: { type:String, required: true },
    tipoContenido: { type: String, required: true },
    fechaEntradaVigencia: { type: Date, required: true },
    fechaSalidaVigencia: { type: Date, required: true },
    tiempoLectura: { type: String, required: true },
    estados: [{ type: Schema.Types.ObjectId,ref:'Estado', required: true }],
    destinatarios: [{ type: Schema.Types.ObjectId, ref: 'AreaRol', required: true}],
    recursos: [{ type: Schema.Types.ObjectId, ref: 'Recurso', required: true}],
    mediosTransmision: [{ type: String, required: true}],
    codigoQR: { type: String, required: true},
    redactor: { type: Schema.Types.ObjectId, ref: 'Persona'}
})

//exportar el esquema
module.exports = mongoose.models.Anuncio || mongoose.model('Anuncio', anuncioSchema);