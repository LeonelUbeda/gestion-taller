import express, { json } from "express"
import database from './Database/database';
//import bodyParser from 'body-parser'

const app = express();
app.use()

//IMPORTANDO RUTAS
import RutaCliente from './Routes/Cliente'

//Modelos

/*
import Cliente from './Models/Cliente'
import Telefono from './Models/Telefono'

Cliente.create({nombre: "Leonel", apellido: "Ubeda", fechaRegistro: Date.now()})
.then(respuesta => console.log(respuesta.ID))
.then(async() => {
    try {
        await Telefono.create({telefono: '22225978', ID_Cliente: 1})
        const respuesta = await Telefono.findAll({ where:{ ID_Cliente: 1 } })
        console.log(JSON.stringify(respuesta))
        
    } catch (error) {
        console.log(error.Error)
        console.log("HA OCURRIO UN ERRORS")
    }
})
*/


// Verificar que se conectó a la base de datos exitosamente 





database.authenticate()
.then(() => console.log('Conectado a la base de datos'))
.catch(error => console.log(error))




export default app;
