// import modules
const mongoose = require('mongoose')
const dbURL = 'mongodb://localhost:27017/tpfinal'

mongoose.connect(dbURL).then(() => {
    console.log('Conectado a la base de datos')
}).catch(err => {
    console.log('Error al conectar a la base de datos')
    console.log(err)
})

// export conexion
module.exports = mongoose