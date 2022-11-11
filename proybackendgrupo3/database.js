// import modules
const mongoose = require('mongoose')
const area = require('./models/area')
const persona = require('./models/persona')
const rol = require('./models/rol')


const dbURL = 'mongodb://pysw-db:27017/tpfinal'
mongoose.connect(dbURL).then(async () => {

    var r = await rol.findOne({ nombre: 'administrador' })
    if (!r) {
        r = new rol({ nombre: 'administrador' })
        await r.save()
    }

    var a = await area.findOne({ nombre: 'administracion' })
    if (!a) {
        a = new area({ nombre: 'administracion', roles: [r._id] })
        await a.save()
    }

    var p = await persona.findOne({ nombreUsuario: "admin" })
    if (!p) {
        p = new persona({
            nombreUsuario: "admin",
            contrasenia: "admin",
            email: "admin@admin",
            nombre: "admin",
            apellido: "admin",
            legajo: 1,
            dni: 1,
            estado: true,
            area: a._id,
            roles: [r._id]
        })
        await p.save()
    }

    console.log('Conectado a la base de datos')
}).catch(err => {
    console.log('Error al conectar a la base de datos')
    console.log(err)
})

// export conexion
module.exports = mongoose