/**
 * Path: '/api/login'
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn, renewTokent } = require('../controllers/auth-controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
);

router.post('/google',
    [
        check('token', 'El token de google es obligatoro').notEmpty(),
        validarCampos
    ],
    googleSignIn
);

router.get('/renew', validarJWT, renewTokent );

module.exports = router;