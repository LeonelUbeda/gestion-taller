import express from "express"
import database from './Database/database';
import {json} from 'body-parser'
import dotenv from 'dotenv'
dotenv.config()
const app = express();


// Importando rutas
import RutaCliente from './Routes/Cliente'
import RutaAutenticacion from './Routes/Autenticacion'
import RutaUsuario from './Routes/Usuario'
import RutaRol from './Routes/Rol'
import RutaPermiso from './Routes/Permiso'
// Middlewares
app.use(json())

// Rutas
app.use('/api/cliente',  RutaCliente)
app.use('/api/auth',     RutaAutenticacion)
app.use('/api/usuario',  RutaUsuario )
app.use('/api/rol',      RutaRol)
app.use('/api/permiso',  RutaPermiso)








database.sync(/*{force: true}*/); 



// Verificar que se conectó a la base de datos exitosamente 
database.authenticate()
.then(() => console.log('Conectado a la base de datos'))
.catch(error => console.log(error))




export default app;
