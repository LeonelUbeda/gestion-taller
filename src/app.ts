import express, { json } from "express"
//import bodyParser from 'body-parser'

const app = express();


import database from './Database/database';
//Modelos
import Cliente from './Models/Cliente'
import Telefono from './Models/Telefono'

//Cliente.create({nombre: "Leonel", apellido: "Ubeda", fechaRegistro: Date.now()})
//.then(respuesta => console.log(respuesta.ID))

//Telefono.create({telefono: '81281838', ID_Cliente: 1})
//Telefono.findAll({ where:{ ID_Cliente: 1 } }).then(res => console.log(JSON.stringify(res)))


// Verificar que se conectó a la base de datos exitosamente 





database.authenticate()
.then(() => console.log('Conectado a la base de datos'))
.catch(error => console.log(error))




export default app;
