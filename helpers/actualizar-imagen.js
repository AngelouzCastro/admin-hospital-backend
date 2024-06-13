const Hospital = require('../models/hospital-model');
const Medico = require('../models/medico-model');
const Usuario = require('../models/usuario-model');
const fs = require('fs');

const borrarPathViejo = ( path ) => {
    if ( fs.existsSync( path ) ) {
        //borrar la imagen anterior
        fs.unlinkSync( path );
    }
}


const actuliazarImagen = async ( tipo, id, nombreArchivo ) => {

    let pathViejo = '';
    switch ( tipo ) {
        case 'medicos':
            const medico = await Medico.findById( id );
            if ( !medico ) {
                return false;
            }

            pathViejo = `./uploads/medicos/${ medico.img }`;
            borrarPathViejo( pathViejo );

            medico.img = nombreArchivo;
            await medico.save();
            return true;

            break;
        case 'hospitales':
            const hospital = await Hospital.findById( id );
            if ( !hospital ) {
                return false;
            }

            pathViejo = `./uploads/hospitales/${ hospital.img }`;
            borrarPathViejo( pathViejo );

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
            
            break;
        case 'usuarios':
            const usuario = await Usuario.findById( id );
            if ( !usuario ) {
                return false;
            }

            pathViejo = `./uploads/usuarios/${ usuario.img }`;
            borrarPathViejo( pathViejo );

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            
            break;
    
        default:
            return
            break;
    }
}


module.exports = {
    actuliazarImagen
}