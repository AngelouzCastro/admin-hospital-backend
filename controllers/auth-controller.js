const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario-model');
const { generarJWT } = require('../helpers/jwt');

const login = async( req, res = response ) => {

    const { email, password } = req.body;

    try {

        //verficar email
        const usuarioDb = await Usuario.findOne({ email });

        console.log(usuarioDb);
        if ( !usuarioDb ) {
            return res.status(404).json({
                ok: false,
                msg: 'credenciales invalidas'
            });
        }

        //verificar password
        const validPassword = bcrypt.compareSync( password, usuarioDb.password );

        if ( !validPassword ) {
            return res.status(404).json({
                ok: false,
                msg: 'credenciales invalidas'
            });
        }

        //generar TOKEN - JWT

        const token = await generarJWT( usuarioDb.id );

        return res.status(200).json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error en el login'
        });
    }
}

module.exports = {
    login
}