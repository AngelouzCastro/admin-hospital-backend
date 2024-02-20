const mongoose = require('mongoose');

const dbConection = async () => {

    try {
        await mongoose.connect( process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true
        });

        console.log('DB Online');

    } catch (error) {
        console.log(error);
        throw new Error('Error al la hora de conectar a la base de datos')
    }

};

module.exports = {
    dbConection
}