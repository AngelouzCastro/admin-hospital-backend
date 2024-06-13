/**
 * Path: '/api/busqueda'
 */

const { Router } = require('express');
const { buscar, getDocumentosColeccion } = require('../controllers/busquedas-controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:busqueda', validarJWT, buscar);

router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion);

module.exports = router;

