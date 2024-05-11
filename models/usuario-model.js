const { Schema, model  } = require('mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    }
});

// cambiar forma visual de ver el objeto en mi servidor
//para implementar el modelo
UsuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...Object } = this.toObject();

    Object.uid = _id;
    return Object;
})

module.exports = model ( 'Usuario', UsuarioSchema );

