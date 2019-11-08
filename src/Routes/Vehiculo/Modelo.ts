import {Router} from 'express'

const router = Router();

import manejadorGenerico from '../../Controllers/manejadorGenerico'
import Modelo from '../../Models/Vehiculo/Modelo';
// Ruta generica para buscar roles


router.get('/',         manejadorGenerico({modelo: Modelo,     accion: manejadorGenerico.LEER}))
router.get('/:id',      manejadorGenerico({modelo: Modelo,     accion: manejadorGenerico.LEER_POR_ID}))
router.post('/',        manejadorGenerico({modelo: Modelo,     accion: manejadorGenerico.CREAR}))
router.put('/:id',      manejadorGenerico({modelo: Modelo,     accion: manejadorGenerico.ACTUALIZAR_POR_ID}))
router.delete('/:id',   manejadorGenerico({modelo: Modelo,     accion: manejadorGenerico.ELIMINAR_POR_ID }))



export default router