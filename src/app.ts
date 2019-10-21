import express, { json } from "express"
//import bodyParser from 'body-parser'

const app = express();


import database from './Database/database';
//Modelos

import Cliente from './Models/Cliente'
Cliente.sync()
// Verificar que se conectó a la base de datos exitosamente 
database.authenticate()
.then(() => console.log('Conectado a la base de datos'))
.catch(error => console.log(error))




export default app;
