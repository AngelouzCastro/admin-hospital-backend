const { Schema, model  } = require('mongoose');

const HospitalSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId, 
        ref: 'Usuario'
    }
},{ collections: 'hospitales'});

HospitalSchema.method('toJSON', function() {
    const { __v, ...Object } = this.toObject();

    return Object;
})

module.exports = model ( 'Usuario', HospitalSchema );

