// import modules
const anuncioController = require('../controllers/anuncio.controller');
const express = require('express');

// router
const router = express.Router();

// routes
router.get('/', anuncioController.getAnuncios);
router.post('/crear', anuncioController.createAnuncio);
router.delete('/eliminar/:id', anuncioController.deleteAnuncio);
router.put('/actualizar/:id', anuncioController.updateAnuncio);
//router.get('/:idArea',anuncioController.getAnunciosArea);

// export router
module.exports = router;