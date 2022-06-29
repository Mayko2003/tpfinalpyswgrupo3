// import modules
const areaController = require('../controllers/area.controller');
const express = require('express');

// router
const router = express.Router();


// routes
router.get('/', areaController.getAreas);
router.get('/roles/:id', areaController.getRoles);
router.post('/crear', areaController.createArea);
router.delete('/eliminar/:id', areaController.deleteArea);
router.put('/actualizar/:id', areaController.updateArea);

// export router
module.exports = router;