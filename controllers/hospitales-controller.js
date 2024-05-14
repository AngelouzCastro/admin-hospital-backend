const { response } = require('express');
const Hospital = require('../models/hospital-model');

const getHospitales = async ( req, res = response ) => {

    try {

        const hospitales = await Hospital.find()
                                            .populate('usuario', 'nombre img');

        res.status(200).json({
            ok: true,
            hospitales
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'No se pudo obtener la información'
        });
        
    }

}

const crearHospital = async ( req, res = response ) => {

    try {
        const uid = req.uid;
        const hospital = new Hospital({
            usuario: uid,
            ...req.body
        });

        const hospitalDb = await hospital.save();

        res.status(200).json({
            ok: true,
            hospital: hospitalDb
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            msg: 'Hable con el administrador'
        });
    }

}

const actualizarHospitales = async ( req, res = response ) => {

    try {
        
        const hospitalId = req.params.id;
        const usuario = req.uid;

        const hospitalD = await Hospital.findById({ _id: hospitalId });

        if ( !hospitalD ) {
            return res.status(404).json({
                ok: false,
                msg: 'no se encontro ningun hospital con ese Id'
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate( hospitalId, cambiosHospital, { new: true });

        res.status(200).json({
            ok: true,
            hospital: hospitalActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el asministrador'
        });
    }
}

const eliminarHospital = async ( req, res = response ) => {

    try {
        
        const hospitalId = req.params.id;
        const usuario = req.uid;

        const hospitalD = await Hospital.findById({ _id: hospitalId });

        if ( !hospitalD ) {
            return res.status(404).json({
                ok: false,
                msg: 'no se encontro ningun hospital con ese Id'
            });
        }

        await Hospital.findByIdAndDelete( hospitalId );

        res.status(200).json({
            ok: true,
            msg: 'Hospital eliminado'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el asministrador'
        });
    }

}

module.exports = {
    getHospitales,
    actualizarHospitales,
    eliminarHospital,
    crearHospital
};