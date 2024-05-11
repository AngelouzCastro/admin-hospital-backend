const { response } = require('express');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const Usuario = require('../models/usuario-model');

const getUsuarios = async (req, res) => {

    const usuario = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuario,
        uid: req.uid
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

        //Generar - JWT
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            usuario: {
                name: usuario.nombre,
                email: usuario.email,
                id: usuario._id
            },
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado'
        })
    }

}

const ActualizarUsuario = async ( req, res = response ) => {
    
    try {
        
        const uid = req.params.id;

        const usuarioDb = await Usuario.findById( uid );

        if (!usuarioDb ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese Id'
            });
        }

        const { google,password, email, ...campos} = req.body;

        if ( usuarioDb.email !== email ) {
            const existEmail = await Usuario.findOne({ email });
            if ( existEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findById( uid, campos, {new: true} );


        res.json({
            ok: true,
            usuarioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const BorrarUsuario = async (req, res = response ) => {
    try {
        const uid = req.params.id;

        const usuarioDb = await Usuario.findById( uid );

        if (!usuarioDb ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese Id'
            });
        }

        await Usuario.findByIdAndDelete( uid );

        res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

module.exports = {
    getUsuarios,
    createUsuario,
    ActualizarUsuario,
    BorrarUsuario
}