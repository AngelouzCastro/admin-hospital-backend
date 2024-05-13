/**
 * path: 'api/hopitales'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const {
    getHospitales,
    actualizarHospitales,
    eliminarHospital,
    crearHospital
 } = require('../controllers/hospitales-controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router =  Router();

router.get( '/', validarJWT, getHospitales );

router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').notEmpty(),
        validarCampos
    ],
    crearHospital
 );

router.put('/:id',
    [],
    actualizarHospitales
);

router.delete('/:id',
    [],
    eliminarHospital
);

module.exports = router;