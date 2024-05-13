const { response } = require('express');
const Medico = require('../models/medico-model');


const getMedicos = async ( req, res = response ) => {

    try {

        const medicos = await Medico.find()
                                    .populate('usuario', 'nombre img')
                                    .populate('hospital', 'nombre img');

        res.status(200).json({
            ok: true,
            medicos
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "error en la consulta"
        });
        
    }

}

const crearMedico = async ( req, res = response ) => {

    const uid = req.uid;

    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {

        const medicoDb = await medico.save();

        res.status(200).json({
            ok: true,
            medico: medicoDb
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador please'
        })
    }
}

const actualizarMedico = ( req, res = response ) => {

    res.status(200).json({
        ok: true,
        msg: 'actualizar Medico'
    })
}

const eliminarMedico = ( req, res = response ) => {

    res.status(200).json({
        ok: true,
        msg: 'eliminar medico'
    })
}

module.exports = {
    crearMedico,
    getMedicos,
    actualizarMedico,
    eliminarMedico
};