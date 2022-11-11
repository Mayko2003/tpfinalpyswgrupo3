// import modules
const { mongoose } = require('./database') // conexion base de datos
const express = require('express')
const cors = require('cors') // middleware para permitir peticiones desde otro dominio

// init server
const app = express()

// middlewares
//allow cors to all origins
app.use(cors({ origin: '*'}))


app.use(express.json({ limit: '50mb' })) // para que el servidor entienda los datos en formato json
app.use(express.urlencoded({ extended: true })) // para que el servidor entienda los datos en formato urlencoded

// routes
app.use('/api/personas', require('./routes/persona.routes'))
app.use('/api/roles', require('./routes/rol.routes'))
app.use('/api/areas', require('./routes/area.routes'))
app.use('/api/anuncios', require('./routes/anuncio.routes'))
app.use('/api/emails', require('./routes/email.routes'))
    // configs
app.set('port', process.env.PORT || 3000)

// start server
app.listen(app.get('port'), () => {
    console.log('Servidor corriendo en el puerto ', app.get('port'))
})