
const jwt = require('jsonwebtoken');


// los middelwere son como cualquier otro controlador solo que tienen un next()
const validarJWT = ( req, res, next ) => {
    
    //leer el token
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {

        //validar firma
        const { uid } = jwt.verify( token, process.env.JWT_SECRET );
        req.uid = uid; // esto para compartir informacion 

        // concluye middleware
        next();

        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msh: 'Token no valido'
        })
    }

}

module.exports = {
    validarJWT,
}