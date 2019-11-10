import {Router, Response, Request} from 'express'
const router = Router();
// -------------------- Controladores --------------------
import {permisoNuevo, permisoTodos, permisoId, permisoActualizar, permisoEliminar} from '../Controllers/Usuario/permiso.controller'
import { Permiso } from '../Models/Usuario/RolPermiso';
import manejadorGenerico from '../Controllers/manejadorGenerico';



// -------------------- Rutas Permiso --------------------

// Obtiene todos los permisos
router.get('/', manejadorGenerico({modelo: Permiso, accion: manejadorGenerico.LEER}))

// Obtiene un unico permiso
router.get('/:id', manejadorGenerico({modelo: Permiso, accion: manejadorGenerico.LEER_POR_ID}))

// Crear nuevo Permiso.
router.put('/:id', manejadorGenerico({modelo: Permiso, accion: manejadorGenerico.ACTUALIZAR_POR_ID}))

// Crear nuevo Permiso
router.post('/', manejadorGenerico({modelo: Permiso, accion: manejadorGenerico.CREAR}))

// Eliminar permiso.
router.delete('/:id', manejadorGenerico({modelo: Permiso, accion: manejadorGenerico.ELIMINAR_POR_ID}))

export default router;