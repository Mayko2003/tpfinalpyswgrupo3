// import modules
const rolController = require('../controllers/rol.controller');
const express = require('express');

// router
const router = express.Router();


// routes
router.get('/', rolController.getRoles);
router.post('/crear', rolController.createRol);
router.delete('/eliminar/:id', rolController.deleteRol);
router.put('/actualizar/:id', rolController.updateRol);

// export router
module.exports = router;