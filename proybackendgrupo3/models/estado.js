// import modulos
const mongoose = require('mongoose');
const { Schema } = mongoose; // para poder usar el schema de mongoose

const estadoSchema = new Schema({
    estado: { type: String, required: true},
    area: { type: Schema.Types.ObjectId, ref: 'Area', required: true},
})

//exportar el esquema
module.exports = mongoose.models.Estado || mongoose.model('Estado', estadoSchema);