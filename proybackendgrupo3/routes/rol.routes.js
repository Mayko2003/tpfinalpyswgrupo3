// import modules
const rolController = require('../controllers/rol.controller');
const authController = require('../controllers/auth.controller');
const express = require('express');

// router
const router = express.Router();


// routes
router.get('/', authController.verifyToken, rolController.getRoles);
router.post('/crear', authController.verifyToken, rolController.createRol);
router.delete('/eliminar/:id', authController.verifyToken, rolController.deleteRol);
router.put('/actualizar/:id', authController.verifyToken, rolController.updateRol);

// export router
module.exports = router;