// import modules
const areaController = require('../controllers/area.controller');
const authController = require('../controllers/auth.controller');
const express = require('express');

// router
const router = express.Router();


// routes
router.get('/',authController.verifyToken, areaController.getAreas);
router.get('/roles/:id', authController.verifyToken, areaController.getRoles);
router.post('/crear', authController.verifyToken, areaController.createArea);
router.delete('/eliminar/:id', authController.verifyToken, areaController.deleteArea);
router.put('/actualizar/:id', authController.verifyToken, areaController.updateArea);
router.get('/encargado/:id', authController.verifyToken, areaController.getEncargado);
// export router
module.exports = router;