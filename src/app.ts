import express from "express"
import database from './Database/database';
import {json} from 'body-parser'


const app = express();


// Importando rutas
import RutaCliente from './Routes/Cliente'

// Middlewares
app.use(json())

// Rutas
app.use('/api/cliente', RutaCliente);


// Verificar que se conectó a la base de datos exitosamente 
database.authenticate()
.then(() => console.log('Conectado a la base de datos'))
.catch(error => console.log(error))




export default app;
