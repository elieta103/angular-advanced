const express  = require('express');
const { dbConnection }  = require('./database/config');
const cors = require('cors')

require('dotenv').config();

//Crear el servidor de express
const app = express();

//Configurar CORS. Middleware
app.use(cors());

//Base de datos
dbConnection();

//Lectura y parseo del body, antes de las rutas. Middleware
app.use(express.json())


//Rutas.  Middleware
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/login', require('./routes/auth'))





app.listen(process.env.PORT, ()=>{
    console.log('Servidor corriendo en el puerto '+process.env.PORT);
})