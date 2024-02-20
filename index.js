const exxpress = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConection } = require('./database/config')


// crear el servidor de express
const app = exxpress();
const puerto = process.env.PORT;

//Configurar CORS
app.use(cors());

//Base de datos
dbConection();



// Rutas
app.get( '/', (req, res) => {

    res.json({
        ok: true,
        msg: 'hola mundo'
    })

} );


app.listen( puerto, () => {
    console.log('servidor corriendo en puerto', puerto);
});