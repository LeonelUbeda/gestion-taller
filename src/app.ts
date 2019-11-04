import express from "express"
import database from './Database/database';
import {json} from 'body-parser'
import dotenv from 'dotenv'

import verificarLogin from './Middlewares/verificarLogin'

dotenv.config()
const app = express();


// -------------------- Importando rutas --------------------

import RutaCliente from './Routes/Cliente'
import RutaAutenticacion from './Routes/Autenticacion'
import RutaUsuario from './Routes/Usuario'
import RutaRol from './Routes/Rol'
import RutaPermiso from './Routes/Permiso'
import RutaRolPermiso from './Routes/Usuario/RolPermiso'
import RutaDatosDePrueba from './Routes/DatosDePrueba/Main'
import RutaCategoriaServicio from './Routes/Servicio/Categoria'
// -------------------- Midlewares --------------------
app.use(json())

// -------------------- Ruras --------------------
app.use('/api/cliente', /*verificarLogin,*/ RutaCliente)
app.use('/api/auth',        RutaAutenticacion)
app.use('/api/usuario',     RutaUsuario )
app.use('/api/rol',         RutaRol)
app.use('/api/permiso',     RutaPermiso)
app.use('/api/rolpermiso',  RutaRolPermiso)
app.use('/api/datosdeprueba', RutaDatosDePrueba)
app.use('/api/servicio/categoria', RutaCategoriaServicio)





// Para eliminar y crear la base de datos
//database.sync(/*{force: true}*/)



// -------------------- Verificar DB --------------------
database.authenticate()
.then(() => console.log('Conectado a la base de datos'))
.catch(error => console.log(error))




export default app;
