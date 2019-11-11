import {Router, Response, Request} from 'express'

const router = Router();

import { UnidadDeMedida } from '../../Models/Inventario/Insumo';
import manejadorGenerico from '../../Controllers/manejadorGenerico'

// Ruta generica para buscar roles


router.get('/',         manejadorGenerico({modelo: UnidadDeMedida,     accion: manejadorGenerico.LEER}))
router.get('/:id',      manejadorGenerico({modelo: UnidadDeMedida,     accion: manejadorGenerico.LEER_POR_ID}))
router.post('/',        manejadorGenerico({modelo: UnidadDeMedida,     accion: manejadorGenerico.CREAR}))
router.put('/:id',      manejadorGenerico({modelo: UnidadDeMedida,     accion: manejadorGenerico.ACTUALIZAR_POR_ID}))
router.delete('/:id',   manejadorGenerico({modelo: UnidadDeMedida,     accion: manejadorGenerico.ELIMINAR_POR_ID }))



export default router