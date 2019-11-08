import {Router} from 'express'

const router = Router();

import manejadorGenerico from '../../Controllers/manejadorGenerico'
import Marca from '../../Models/Vehiculo/Marca';
import Modelo from '../../Models/Vehiculo/Modelo';
import Version from '../../Models/Vehiculo/Version';
// Ruta generica para buscar roles


// -------------------- Rutas Marca --------------------
router.get('/marcas/',         manejadorGenerico({modelo: Marca,     accion: manejadorGenerico.LEER_PARAMETROS}))
router.get('/marcas/:id',      manejadorGenerico({modelo: Marca,     accion: manejadorGenerico.LEER_POR_ID}))
router.post('/marcas/',        manejadorGenerico({modelo: Marca,     accion: manejadorGenerico.CREAR}))
router.put('/marcas/:id',      manejadorGenerico({modelo: Marca,     accion: manejadorGenerico.ACTUALIZAR_POR_ID}))
router.delete('/marcas/:id',   manejadorGenerico({modelo: Marca,     accion: manejadorGenerico.ELIMINAR_POR_ID }))


// -------------------- Rutas Marca/Modelo --------------------

// Obtener modelos de una marca
router.get('/marcas/:marcaId/modelos',         manejadorGenerico({modelo: Modelo,     accion: manejadorGenerico.LEER_PARAMETROS}))

// Crear un modelo con la marca especificada
router.post('/marcas/:marcaId/modelos',        manejadorGenerico({modelo: Modelo,     accion: manejadorGenerico.CREAR}))

// Eliminar todas las versiones de un modelo
router.delete('/marcas/:marcaId/modelos',      manejadorGenerico({modelo: Modelo,    accion: manejadorGenerico.ELIMINAR_POR_PARAMETROS}))


// -------------------- Rutas Modelo --------------------
router.get('/modelos',         manejadorGenerico({modelo: Modelo,     accion: manejadorGenerico.LEER}))
router.get('/modelos/:id',     manejadorGenerico({modelo: Modelo,     accion: manejadorGenerico.LEER_POR_ID}))
router.put('/modelos/:id',     manejadorGenerico({modelo: Modelo,     accion: manejadorGenerico.ACTUALIZAR_POR_ID}))
router.delete('/modelos/:id',  manejadorGenerico({modelo: Modelo,     accion: manejadorGenerico.ELIMINAR_POR_ID}))


// -------------------- Rutas Modelo/Version --------------------

// Obtener versiones de un modelo especifico
router.get('/modelos/:modeloId/versiones', manejadorGenerico({modelo: Version,       accion: manejadorGenerico.LEER_PARAMETROS}))

// Crear una version con el modelo especificado
router.post('/modelos/:modeloId/versiones', manejadorGenerico({modelo: Version,     accion: manejadorGenerico.CREAR}))

// Eliminar todas las versiones de un modelo

router.delete('/modelos/:modeloId/versiones', manejadorGenerico({modelo: Version,    accion: manejadorGenerico.ELIMINAR_POR_PARAMETROS}))



// -------------------- Rutas Version --------------------
router.get('/versiones',         manejadorGenerico({modelo: Version,     accion: manejadorGenerico.LEER}))
router.get('/versiones/:id',     manejadorGenerico({modelo: Version,     accion: manejadorGenerico.LEER_POR_ID}))
router.put('/versiones/:id',     manejadorGenerico({modelo: Version,     accion: manejadorGenerico.ACTUALIZAR_POR_ID}))
router.delete('/versiones/:id',  manejadorGenerico({modelo: Version,     accion: manejadorGenerico.ELIMINAR_POR_ID}))


export default router