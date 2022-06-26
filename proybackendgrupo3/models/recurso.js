// import modulos
const mongoose = require('mongoose');
const Anuncio = require('./anuncio');
const { Schema } = mongoose; // para poder usar el schema de mongoose

const recursoSchema = new Schema({
    tipo: { type:String, required: true},
    recurso : { type: String, required: true}
})

//exportar el esquema
module.exports = mongoose.models.Recurso || mongoose.model('Recurso', recursoSchema);