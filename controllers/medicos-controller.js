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

const actualizarMedico = async ( req, res = response ) => {

    try {
        const id = req.params.id;
        const uid = req.uid;

        const medicoDb = await Medico.findOne({ _id: id });

        if ( !medicoDb ) {
            return res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado'
            })
        }

        const nuevoMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate( id, nuevoMedico, { new: true })
        .populate('usuario', 'nombre')
        .populate('hospital', 'nombre');

        res.status(200).json({
            ok: true,
            medico: medicoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const eliminarMedico = async ( req, res = response ) => {

    try {
        const id = req.params.id;

        const medicoDb = await Medico.findOne({ _id: id });

        if ( !medicoDb ) {
            return res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado'
            })
        }

        

        await Medico.findByIdAndDelete( id );

        res.status(200).json({
            ok: true,
            msg: 'Medico eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    crearMedico,
    getMedicos,
    actualizarMedico,
    eliminarMedico
};