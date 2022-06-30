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
router.get('/area/:idArea/:estado',anuncioController.getAnunciosAreaEncargado);
router.get('/persona/:idPersona',anuncioController.getMisAnuncios);
router.get('/fecha/:tipo/:valor',anuncioController.obtenerAnunciosFecha);
router.post('/fecha',anuncioController.obtenerAnunciosFechaRango);
router.post('/roles',anuncioController.getAnuncioByRoles);
router.get('/contenido/:tipo',anuncioController.busquedaAnuncioTipoContenido);
router.get('/area/:idArea',anuncioController.getAnunciosArea);

// export router
module.exports = router;