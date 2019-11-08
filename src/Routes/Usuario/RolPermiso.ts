import {Router, Response, Request} from 'express'
const router = Router();

// -------------------- Controladores --------------------
import {rolPermisoActualizar, rolPermisoEliminar, rolPermisoNuevo, rolPermisoTodos} from '../../Controllers/Usuario/rolpermiso.controller';
import manejadorGenerico from '../../Controllers/manejadorGenerico';

// -------------------- Modelo --------------------
import { RolPermiso } from '../../Models/Usuario/RolPermiso';



router.get('/', manejadorGenerico({modelo: RolPermiso, accion: manejadorGenerico.LEER}));


router.post('/', manejadorGenerico({modelo: RolPermiso, accion: manejadorGenerico.CREAR}));

// api/rolpermiso/rol/2/permiso/6
router.put('/rol/:rolId/permiso/:permisoId', manejadorGenerico({modelo: RolPermiso, accion: manejadorGenerico.ACTUALIZAR_POR_PARAMETROS}))


// api/rolpermiso/rol/2/permiso/6
/*
router.put('/rol/:rolId/permiso/:permisoId', async(req: Request, res: Response ) => {
    const elemento = req.body
    const { rolId , permisoId} = req.params
    try {
        const respuesta = await rolPermisoActualizar({...elemento}, {rolId, permisoId})
        res.status(200).json(respuesta)
    } catch (error) {
        console.log(error)
        res.status(400).json({mensaje: 'Error'})
    }
})

*/
// api/rolpermiso/rol/2/permiso/6
router.delete('/rol/:rolId/permiso/:permisoId', async (req: Request, res: Response ) => {
    const { rolId, permisoId } = req.params
    try {
        const respuesta = await rolPermisoEliminar({rolId, permisoId})
        res.status(200).json(respuesta)
    } catch (error) {
        console.log(error)
        res.status(400).json({mensaje: 'Error'})
    }
})
// api/rolpermiso/rol/2
router.delete('/rol/:rolId', async (req: Request, res: Response ) => {
    const { rolId } = req.params
    try {
        const respuesta = await rolPermisoEliminar({rolId})
        res.status(200).json(respuesta)
    } catch (error) {
        console.log(error)
        res.status(400).json({mensaje: 'Error'})
    }
})

// api/rolpermiso/permiso/6
router.delete('/permiso/:permisoId', async (req: Request, res: Response ) => {
    const { permisoId } = req.params
    try {
        const respuesta = await rolPermisoEliminar({permisoId})
        res.status(200).json(respuesta)
    } catch (error) {
        console.log(error)
        res.status(400).json({mensaje: 'Error'})
    }
})




export default router