const { response } = require('express');
const Usuario = require('../models/usuario-model');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');



const login = async( req, res = response ) => {
    
    try {

        const { email, password } = req.body;

        //verificar email
        const usuarioDb = await Usuario.findOne({ email });
        if ( !usuarioDb ) {
            return res.status(404).json({
                ok: false,
                msg: 'emial o contraseña no encontrada'
            });
        }

        //verificar password
        const validarPassword = bcryptjs.compareSync( password, usuarioDb.password );

        if ( !validarPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'emial o contraseña no encontrada'
            });
        }

        //Generar - JWT
        const token = await generarJWT( usuarioDb.id );

        res.status(200).json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        });
    }
}

const googleSignIn = async ( req, res = response ) => {

    try {
        const { email, name, picture } = await googleVerify( req.body.token );

        const usuarioDb = await Usuario.findOne({ email });
        let usuario;

        if ( !usuarioDb ) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
            
        } else {
            usuario = usuarioDb;
            usuario.google = true;
        }

        await usuario.save();

        
        //Generar - JWT
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            email,
            name,
            picture,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Token de google no es correcto'
        });
    }
}

module.exports = {
    login,
    googleSignIn
}