// import modules
const personaController = require('../controllers/persona.controller')
const authController = require('../controllers/auth.controller')
const express = require('express')

// router
const router = express.Router()


// routes
router.get('/', authController.verifyToken, personaController.getPersonas)
router.post('/crear', authController.verifyToken, personaController.createPersona)
router.delete('/eliminar/:id', authController.verifyToken, personaController.deletePersona)
router.put('/actualizar/:id', authController.verifyToken, personaController.updatePersona)
router.post('/login', personaController.loginPersona)
router.get('/logged', authController.verifyToken, personaController.getLoggedPersona)
// export router
module.exports = router