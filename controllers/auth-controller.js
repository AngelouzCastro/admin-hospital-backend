const { response } = require('express');
const usuario = require('../models/usuario-model');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');



const login = async( req, res = response ) => {
    try {


        const { email, password } = req.body;

        //verificar email
        const usuarioDb = await usuario.findOne({ email });
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

module.exports = {
    login
}