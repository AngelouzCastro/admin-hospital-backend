/**
 * Path: '/api/uploads'
 */

const { Router } = require('express');
const { uploadFile, retornarImagen } = require('../controllers/upload-controller');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarIdMongo } = require('../middlewares/validar-IdMongo');
const fileUpload = require('express-fileupload');

const router = Router();

router.use(fileUpload());

router.put('/:tipo/:id', 
    [
        validarJWT,
        validarIdMongo 
    ], 
    uploadFile );

router.get('/:tipo/:foto',retornarImagen );


module.exports = router;

