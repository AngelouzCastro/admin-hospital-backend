/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, createUsuario, ActualizarUsuario, BorrarUsuario } = require('../controllers/usuarios-controller');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarIdMongo } = require('../middlewares/validar-IdMongo');

const router =  Router();

router.get( '/', validarJWT, getUsuarios );

router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ],
    createUsuario 
 );

router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El rol es obligatorio').not().isEmpty(),
        validarCampos,
        validarIdMongo
    ],
    ActualizarUsuario
);

router.delete('/:id',
    [
        validarJWT,
        validarIdMongo
    ],
    BorrarUsuario
);

module.exports = router;