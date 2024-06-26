/**
 * path: 'api/medicos'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const {
    crearMedico,
    getMedicos,
    actualizarMedico,
    eliminarMedico
 } = require('../controllers/medicos-controller');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarIdMongo } = require('../middlewares/validar-IdMongo');

const router =  Router();

router.get( '/', validarJWT, getMedicos );

router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre del mdico es requerido').notEmpty(),
        check('hospital', 'Se tiene que seleccionar un hospital').notEmpty(),
        check('hospital', 'Id de hospital no valido').isMongoId(),
        validarCampos
    ],
    crearMedico
 );

router.put('/:id',
    [
        validarJWT,
        validarIdMongo
    ],
    actualizarMedico
);

router.delete('/:id',
    [
        validarJWT,
        validarIdMongo
    ],
    eliminarMedico
);

module.exports = router;