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
import RutaUsuario from './Routes/Usuario/Usuario'
import RutaRol from './Routes/Usuario/Rol'
import RutaPermiso from './Routes/Usuario/Permiso'
import RutaRolPermiso from './Routes/Usuario/RolPermiso'
import RutaDatosDePrueba from './Routes/DatosDePrueba/Main'
import RutaCategoriaServicio from './Routes/Servicio/Categoria'
import RutaServicio from './Routes/Servicio/Servicio'
import RutaClasificacionAuto from './Routes/Vehiculo/ClasificacionAuto'
import RutaAuto from './Routes/Vehiculo/Auto'
// -------------------- Midlewares --------------------
app.use(json())



// -------------------- Rutas --------------------
app.use('/api/clientes',        RutaCliente)
app.use('/api/auth',            RutaAutenticacion)
app.use('/api/usuarios',        RutaUsuario )
app.use('/api/roles',           RutaRol)
app.use('/api/permisos',        RutaPermiso)
app.use('/api/rolpermiso',      RutaRolPermiso)
app.use('/api/datosdeprueba',   RutaDatosDePrueba)
app.use('/api/servicios/',              RutaServicio)
app.use('/api/servicios/categorias',    RutaCategoriaServicio)
app.use('/api/vehiculos/',               RutaClasificacionAuto) // Dentro de esta ruta esta /marca /modelo /version
app.use('/api/vehiculos',               RutaAuto)





// Para eliminar y crear la base de datos
//database.sync(/*{force: true}*/)

// -------------------- Verificar DB --------------------
database.authenticate()
.then(() => console.log('Conectado a la base de datos'))
.catch(error => console.log(error))


export default app;
