// import modulos
const mongoose = require('mongoose');
const { Schema } = mongoose; // para poder usar el schema de mongoose

const areaRolSchema = new Schema({
    roles: [{ type: Schema.Types.ObjectId, ref: 'Rol', required: true }],
    area: { type: Schema.Types.ObjectId, ref: 'Area', required: true }
})

//exportar el esquema
module.exports = mongoose.models.AreaRol || mongoose.model('AreaRol', areaRolSchema);