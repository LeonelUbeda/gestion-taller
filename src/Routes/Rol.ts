import {Router, Response, Request} from 'express'

const router = Router();


// -------------------- Controladores --------------------
import manejadorGenerico from '../Controllers/manejadorGenerico';
import { Rol, Permiso } from '../Models/Usuario/RolPermiso';



// -------------------- Rutas Rol --------------------

// Ruta generica para buscar roles
router.get('/', manejadorGenerico({modelo: Rol, accion: manejadorGenerico.LEER}));

// Obtener Rol por id
router.get('/:id', manejadorGenerico({modelo: Rol, accion: manejadorGenerico.LEER_POR_ID}));

// Crear nuevo Rol.
router.post('/', manejadorGenerico({modelo: Rol, accion: manejadorGenerico.CREAR}));

// Actualizar un Rol.
router.put('/:id', manejadorGenerico({modelo: Rol, accion: manejadorGenerico.ACTUALIZAR_POR_ID}));

// Borrar Rol por id
router.delete('/:id', manejadorGenerico({modelo: Rol, accion: manejadorGenerico.ELIMINAR_POR_ID}))

// Obtener la informacion del Rol junto a sus permisos
router.get('/:rolId/permisos', manejadorGenerico({
    modelo: Rol, 
    accion: manejadorGenerico.LEER , 
    include: [{
        model: Permiso, 
        through: { attributes: ['nivelAcceso'] }
    }]
}))

export default router;