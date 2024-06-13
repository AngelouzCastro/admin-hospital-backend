const { response } = require('express');
const Hospital = require('../models/hospital-model');
const Medico = require('../models/medico-model');
const Usuario = require('../models/usuario-model');

const buscar = async ( req, res = response) => {

    const busqueda = req.params.busqueda;

    const regex = new RegExp( busqueda, 'i' );

    const [ usuarios, medicos, hospitales ] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex })
    ]);

    res.status(200).json({
        ok: true,
        msg: 'todo funciona ok',
        usuarios,
        medicos,
        hospitales
    });
}

const getDocumentosColeccion = async ( req, res = response ) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = RegExp( busqueda, 'i' );
    
    let data = [];
    switch ( tabla ) {
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');
            break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
            break;
        case 'hospitales':
            data = await Usuario.find({ nombre: regex }).populate('usuario', 'nombre img');
            break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg: 'Colección no existente'
            });
            break;
    }

    res.status(200).json({
        ok: true,
        resultado: data
    });

}

module.exports = {
    buscar,
    getDocumentosColeccion
}