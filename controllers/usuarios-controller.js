const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario-model');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {

    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuarios,
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

        //generar TOKEN - JWT
        const token = await generarJWT( usuario._id );

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

const actualizarUsuario = async (req, res = response) => {

    //TODO: Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;

    try {
        
        const usuarioDb = await Usuario.findById( uid );

        if ( !usuarioDb ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el usuario po ese id'
            });
        }

        //Actualizaciones
        const { password, google, email, ...campos} = req.body;

        if ( usuarioDb.email !== email ) {
            const existEmail = await Usuario.findOne({ email });
            if ( existEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email!'
                });
            }
        }

        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } ); // { new: true } para que devuelva el nuevo objeto, en caso de que no funciona 'delete'

        usuarioActualizado.password = '*******';
        res.json({
            ok: true,
            usuario: usuarioActualizado,
            msg: 'Usuario actualizado!'
        });

    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const deleteUsuario = async (req, res = response) => {

    //TODO: Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;

    try {
        
        const usuarioDb = await Usuario.findById( uid );

        if ( !usuarioDb ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el usuario con ese id'
            });
        }

        await Usuario.findByIdAndDelete( uid ); // real delete

        res.json({
            ok: true,
            msg: 'Usuario Eliminado :('
        });

    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

module.exports = {
    getUsuarios,
    createUsuario,
    actualizarUsuario,
    deleteUsuario
}