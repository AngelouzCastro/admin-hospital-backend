const exxpress = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConection } = require('./database/config')


// crear el servidor de express
const app = exxpress();
const puerto = process.env.PORT;

//Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use( exxpress.json() );

//Base de datos
dbConection();



// Rutas
app.use( '/api/usuarios' , require('./routes/usuarios'));
app.use( '/api/login' , require('./routes/auth'));


app.listen( puerto, () => {
    console.log('servidor corriendo en puerto', puerto);
});