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

const actualizarHospitales = ( req, res = response ) => {

    res.status(200).json({
        ok: true,
        msg: 'actualizar hospitales'
    })
}

const eliminarHospital = ( req, res = response ) => {

    res.status(200).json({
        ok: true,
        msg: 'eliminar hospitales'
    })
}

module.exports = {
    getHospitales,
    actualizarHospitales,
    eliminarHospital,
    crearHospital
};