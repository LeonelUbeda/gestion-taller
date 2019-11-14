import {Router} from 'express'
const router = Router()


// -------------------- Manejadores --------------------
import manejadorGenerico from '../../Controllers/manejadorGenerico'

// -------------------- Modelos --------------------
import Vehiculo from '../../Models/Vehiculo/Vehiculo'
import Cliente from '../../Models/Cliente'
import Modelo from '../../Models/Vehiculo/Modelo'
import Tipo from '../../Models/Vehiculo/Tipo'
import Version from '../../Models/Vehiculo/Version'
import Marca from '../../Models/Vehiculo/Marca'


// -------------------- Rutas --------------------

router.get('/',         manejadorGenerico({modelo: Vehiculo,     accion: manejadorGenerico.LEER}))

router.get('/:id',      manejadorGenerico({modelo: Vehiculo,     accion: manejadorGenerico.LEER_POR_ID}))

// Obtiene la informacion de un auto con su informacion de Modelo, Tipo y Version
router.get('/:id/info',      manejadorGenerico({
    modelo: Vehiculo,     
    accion: manejadorGenerico.LEER_POR_ID,
    include: [
        {   
            model: Modelo,
            attributes: ['nombre'],
            include: [{model: Marca, attributes: ['nombre']}]
        },
        {
            model: Tipo,
            attributes: ['nombre']
        },
        {
            model: Version,
            attributes: ['nombre']
        }
    ]
}))

router.get('/:id/cliente', manejadorGenerico({modelo: Vehiculo,  
    accion: manejadorGenerico.LEER_POR_ID, 
    include: [{
        model: Cliente,
        attributes: ['nombre', 'apellido']
    }]
}))

router.post('/',        manejadorGenerico({modelo: Vehiculo,     accion: manejadorGenerico.CREAR}))

router.put('/:id',      manejadorGenerico({modelo: Vehiculo,     accion: manejadorGenerico.ACTUALIZAR_POR_ID}))

router.delete('/:id',   manejadorGenerico({modelo: Vehiculo,     accion: manejadorGenerico.ELIMINAR_POR_ID }))

export default router






