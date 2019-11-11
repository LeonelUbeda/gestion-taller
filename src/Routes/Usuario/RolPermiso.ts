import {Router, Response, Request} from 'express'
const router = Router();

// -------------------- Controladores --------------------
import manejadorGenerico from '../../Controllers/manejadorGenerico';

// -------------------- Modelos --------------------
import { RolPermiso } from '../../Models/Usuario/RolPermiso';



router.get('/', manejadorGenerico({modelo: RolPermiso, accion: manejadorGenerico.LEER}));

router.post('/', manejadorGenerico({modelo: RolPermiso, accion: manejadorGenerico.CREAR}));

// api/rolpermiso/rol/2/permiso/6
router.put('/rol/:rolId/permiso/:permisoId', manejadorGenerico({modelo: RolPermiso, accion: manejadorGenerico.ACTUALIZAR_POR_PARAMETROS}))

router.delete('/rol/:rolId/permiso/:permisoId', manejadorGenerico({modelo: RolPermiso, accion: manejadorGenerico.ELIMINAR_POR_PARAMETROS}))


// api/rolpermiso/rol/2
// Por si se quiere borrar todos los registros que conincidan con el rolId
router.delete('/rol/:rolId', manejadorGenerico({modelo: RolPermiso, accion: manejadorGenerico.ELIMINAR_POR_PARAMETROS}) )

// api/rolpermiso/permiso/6
// Lo mismo que arriba
router.delete('/permiso/:permisoId', manejadorGenerico({modelo: RolPermiso, accion: manejadorGenerico.ELIMINAR_POR_PARAMETROS}))




export default router