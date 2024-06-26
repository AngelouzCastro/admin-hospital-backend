const jwt = require('jsonwebtoken');



const validarJWT = ( req, res, next ) => {
    
    //Leer token
    const token = req.header('token'); 

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No existe un token en la peticion' 
        })
    }

    try {

        const { uid } = jwt.verify( token, process.env.JWT_SECRET );
        //una ventaja de el middleware es que puedo modificar la informacion antes de enviarla al controller
        req.uid = uid;
        next();

        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }

}


module.exports = {
    validarJWT
}