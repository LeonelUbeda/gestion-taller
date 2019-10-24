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



import Rol from './Models/Usuario/Rol'
import Permiso from './Models/Usuario/Permiso'
import RolPermiso from './Models/Usuario/RolPermiso'


Rol.create({nombre: 'Administrador'}).then(() => {
    Permiso.create({nombre: 'Vehiculos'}).then(() => {
        RolPermiso.create({ID_Rol: 1, ID_Permiso: 2, nivelAcceso: 4})
    })
})












// Verificar que se conectó a la base de datos exitosamente 
database.authenticate()
.then(() => console.log('Conectado a la base de datos'))
.catch(error => console.log(error))




export default app;
