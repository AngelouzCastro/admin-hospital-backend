const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actuliazarImagen } = require('../helpers/actualizar-imagen');
const path = require('path');
const fs = require('fs');


const uploadFile = async ( req, res = response ) => {

    const { tipo, id } = req.params;
    
    const tiposValidos = ['hospitales', 'usuarios', 'medicos'];

    if( !tiposValidos.includes(tipo) ) {
        return res.status(400).json({
            ok: false,
            msg: 'El tipo seleccionado no es un medico, usauario u hospital'
        })
    }

    //validar que exista algun archivo en la peticion
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }

    //prosesar la imagen
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extencionArchivo = nombreCortado[ nombreCortado.length -1 ];

    //validar exencion
    const extencionesValidas = [ 'jpg', 'jpeg', 'png', 'gif'];

    if ( !extencionesValidas.includes(extencionArchivo) ) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extencion valida solo se permiten (.jpg .jpeg .png .gif)'
        });
    }

    //generar el nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extencionArchivo }`;

    //path para guardar la imagen
    const path = `uploads/${ tipo }/${ nombreArchivo }`;

    //mover la imagen
    file.mv( path, ( err ) => {
        if ( err ) {
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }
    
        res.status(200).json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    });

    //actualizar imagen
    actuliazarImagen( tipo, id, nombreArchivo );
    
}

const retornarImagen = ( req, res = response ) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImagen = path.join( __dirname, `../uploads/${ tipo }/${ foto }`);
    
    if( fs.existsSync( pathImagen )){
        res.sendFile( pathImagen );
    } else {
        const defaultImagenPath = path.join( __dirname, `../uploads/no-img.jpg`);
        res.sendFile( defaultImagenPath );
    }


}

module.exports = {
    uploadFile,
    retornarImagen
}