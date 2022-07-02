// import modules
const anuncioController = require('../controllers/anuncio.controller');
const authController = require('../controllers/auth.controller');
const express = require('express');

// router
const router = express.Router();

// routes
router.get('/', authController.verifyToken, anuncioController.getAnuncios);
router.post('/crear', authController.verifyToken, anuncioController.createAnuncio);
router.delete('/eliminar/:id', authController.verifyToken, anuncioController.deleteAnuncio);
router.put('/actualizar/:id', authController.verifyToken, anuncioController.updateAnuncio);
router.get('/area/:idArea/:estado', authController.verifyToken, anuncioController.getAnunciosAreaEncargado);
router.get('/persona/:idPersona', authController.verifyToken, anuncioController.getMisAnuncios);
router.get('/fecha/:tipo/:valor', authController.verifyToken, anuncioController.obtenerAnunciosFecha);
router.post('/fecha', authController.verifyToken, anuncioController.obtenerAnunciosFechaRango);
router.post('/roles', authController.verifyToken, anuncioController.getAnuncioByRoles);
router.get('/contenido/:tipo', authController.verifyToken, anuncioController.busquedaAnuncioTipoContenido);
router.get('/area/:idArea', authController.verifyToken, anuncioController.getAnunciosArea);

// export router
module.exports = router;