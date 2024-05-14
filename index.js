const exxpress = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConection } = require('./database/config')


// crear el servidor de express
const app = exxpress();
const puerto = process.env.PORT;

//Configurar CORS
app.use(cors());

//carpeta publica
app.use( exxpress.static('public'));

// Lectura y parseo del body
app.use( exxpress.json() );

//Base de datos
dbConection();



// Rutas
app.use( '/api/usuarios' , require('./routes/usuarios'));
app.use( '/api/login' , require('./routes/auth'));
app.use( '/api/hospitales' , require('./routes/hospitales'));
app.use( '/api/medicos' , require('./routes/medicos'));
app.use( '/api/busqueda' , require('./routes/busquedas'));
app.use( '/api/upload' , require('./routes/uploads'));


app.listen( puerto, () => {
    console.log('servidor corriendo en puerto', puerto);
});