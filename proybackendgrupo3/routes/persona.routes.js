// import modules
const personaController = require('../controllers/persona.controller')
const express = require('express')

// router
const router = express.Router()


// routes
router.get('/', personaController.getPersonas)
router.post('/crear', personaController.createPersona)
router.delete('/eliminar/:id', personaController.deletePersona)
router.put('/actualizar/:id', personaController.updatePersona)
router.post('/login',personaController.loginPersona)
// export router
module.exports = router