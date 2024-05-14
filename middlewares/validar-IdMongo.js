const mongoose = require('mongoose');

// Middleware para validar un ID de MongoDB
const validarIdMongo = (req, res, next) => {
    const id = req.params.id; // Suponiendo que el ID está en los parámetros de la solicitud
    
    if ( !mongoose.Types.ObjectId.isValid(id) ) {
        return res.status(400).json({
            ok: false,
            msg: 'ID de MongoDB inválido' 
        });
    }
    
    // Si el ID es válido, continuamos con el siguiente middleware o controlador
    next();
}

module.exports = {
    validarIdMongo
} 