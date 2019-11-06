import {Router} from 'express'

const router = Router();

import Servicio from '../../Models/Servicio/Servicio';
import manejadorGenerico from '../../Controllers/manejadorGenerico'

// Ruta generica para buscar roles


router.get('/',         manejadorGenerico({modelo: Servicio,     accion: manejadorGenerico.LEER}))
router.get('/:id',      manejadorGenerico({modelo: Servicio,     accion: manejadorGenerico.LEER_POR_ID}))
router.post('/',        manejadorGenerico({modelo: Servicio,     accion: manejadorGenerico.CREAR}))
router.put('/:id',      manejadorGenerico({modelo: Servicio,     accion: manejadorGenerico.ACTUALIZAR_POR_ID}))
router.delete('/:id',   manejadorGenerico({modelo: Servicio,     accion: manejadorGenerico.ELIMINAR_POR_ID }))



export default router