import {Router, Response, Request} from 'express'

const router = Router();


// -------------------- Controladores --------------------
import {rolNuevo, rolTodos, rolId, rolEliminar, rolActualizar, rolPermiso} from '../Controllers/Usuario/rol.controller'
import manejadorGenerico from '../Controllers/manejadorGenerico';
import { Rol, Permiso } from '../Models/Usuario/RolPermiso';



// -------------------- Rutas Rol --------------------

// Ruta generica para buscar roles
router.get('/', manejadorGenerico({modelo: Rol, accion: manejadorGenerico.LEER}));

router.get('/:id', manejadorGenerico({modelo: Rol, accion: manejadorGenerico.LEER_POR_ID}));

// Crear nuevo Rol.     Obligatorio: nombre
router.post('/', manejadorGenerico({modelo: Rol, accion: manejadorGenerico.CREAR}));

// Actualizar un rol.   Obligatorio: id     Opcional: campos a actualizar

router.put('/:id', async (req: Request, res: Response) => {
    const elemento = req.body;
    const { id } = req.params
    try {
        const resultado = await rolActualizar({id, ...elemento})
        res.status(201).json(resultado)
    } catch (error) {
        res.status(400).json({mensaje: 'Error'})
    }
})


router.delete('/:id', manejadorGenerico({modelo: Rol, accion: manejadorGenerico.ELIMINAR_POR_ID}))



router.get('/:rolId/permisos', manejadorGenerico({
    modelo: Rol, 
    accion: manejadorGenerico.LEER , 
    include: [{
        model: Permiso, 
        through: { attributes: ['nivelAcceso'] }
    }]
}))

export default router;