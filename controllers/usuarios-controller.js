const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario-model');

const getUsuarios = async (req, res) => {

    const usuario = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuario
    });
}

const createUsuario = async ( req, res = response ) => {

    const { email, password } = req.body;

    try {

        const existEmail = await Usuario.findOne({ email });

        if ( existEmail ) {
            res.status(400).json({
                ok: false,
                msg: 'email duplicado'
            });
            return;
        }

        const usuario = new Usuario( req.body );

        //ecriptar contraseña
        //NOTA: un salt es un numero o data generada de forma aleatoria
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync( password, salt );

        //guardar usuario
        await usuario.save();

        res.json({
            ok: true,
            usuario: {
                name: usuario.nombre,
                email: usuario.email,
                id: usuario._id
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado'
        })
    }

}

module.exports = {
    getUsuarios,
    createUsuario
}