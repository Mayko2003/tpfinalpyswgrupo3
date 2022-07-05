// import modules
const mongoose = require('mongoose')
const dbURL = 'mongodb://localhost:27017/tpfinal'

mongoose.connect(dbURL).then(() => {
    ('Conectado a la base de datos')
}).catch(err => {
    ('Error al conectar a la base de datos')
    (err)
})

// export conexion
module.exports = mongoose