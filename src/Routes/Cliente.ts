import {Router} from 'express'
import verificarPermiso from '../Middlewares/verificarPermisos'
const router = Router();

// -------------------- Manejadores --------------------
import manejadorGenerico from '../Controllers/manejadorGenerico'


// -------------------- Modelos --------------------
import Cliente from '../Models/Cliente';
import Telefono from '../Models/Telefono';
import Vehiculo from '../Models/Vehiculo/Vehiculo';





// -------------------- Rutas Clientes --------------------

router.get('/',     manejadorGenerico({modelo: Cliente , accion: manejadorGenerico.LEER}));

router.get('/:id',  manejadorGenerico({modelo: Cliente, accion: manejadorGenerico.LEER_POR_ID}));

router.post('/',    manejadorGenerico({modelo: Cliente, accion: manejadorGenerico.CREAR}));

router.put('/:id',  manejadorGenerico({modelo: Cliente, accion: manejadorGenerico.ACTUALIZAR_POR_ID}))

router.delete('/:id', manejadorGenerico({modelo: Cliente, accion: manejadorGenerico.ELIMINAR_POR_ID}))


// -------------------- Rutas Telefono -------------------- 

//  Todos los telefonos de un cliente
router.get('/:clienteId/telefono', manejadorGenerico({modelo: Telefono, accion: manejadorGenerico.LEER_PARAMETROS}))


// Busca un telefono sin especificar el id de usuario (por si se necesita en algun momento)
router.get('/telefono/:telefono', manejadorGenerico({modelo: Telefono, accion: manejadorGenerico.LEER_PARAMETROS}))


router.get('/:clienteId/vehiculos', manejadorGenerico({modelo: Vehiculo, accion: manejadorGenerico.LEER_PARAMETROS}))

// Crear nuevo telefono a un cliente
router.post('/:clienteId/telefono', manejadorGenerico({modelo: Telefono, accion: manejadorGenerico.CREAR}))


// Edita un telefono que le pertenece a un cliente. 
// Cliente y telefono tienen que ser especificados en los parametros
router.put('/:clienteId/telefono/:telefono', manejadorGenerico({modelo: Telefono, accion: manejadorGenerico.ACTUALIZAR_POR_PARAMETROS}))

// Borra un telefono que le pertenece a un cliente
// Cliente y telefono tienen que ser especificados en los parametros
router.delete('/:clienteId/telefono/:telefono', manejadorGenerico({modelo: Telefono, accion: manejadorGenerico.ELIMINAR_POR_PARAMETROS}))


export default router;