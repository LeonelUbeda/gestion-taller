import {Router, Response, Request} from 'express'

const router = Router();

import Categoria from '../../Models/Servicio/Categoria';
import manejadorGenerico from '../../Controllers/manejadorGenerico'

// Ruta generica para buscar roles


router.get('/',         manejadorGenerico({modelo: Categoria,     accion: manejadorGenerico.LEER}))
router.get('/:id',      manejadorGenerico({modelo: Categoria,     accion: manejadorGenerico.LEER_POR_ID}))
router.post('/',        manejadorGenerico({modelo: Categoria,     accion: manejadorGenerico.CREAR}))
router.put('/:id',      manejadorGenerico({modelo: Categoria,     accion: manejadorGenerico.ACTUALIZAR_POR_ID}))
router.delete('/:id',   manejadorGenerico({modelo: Categoria,     accion: manejadorGenerico.ELIMINAR_POR_ID }))



export default router