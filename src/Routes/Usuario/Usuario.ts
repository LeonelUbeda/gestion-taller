import {Router, Response, Request} from 'express'
const router = Router();

import manejadorGenerico from '../../Controllers/manejadorGenerico'
import Usuario from '../../Models/Usuario/Usuario';

// -------------------- Controladores --------------------
import {usuarioNuevo, usuarioActualizar} from '../../Controllers/Usuario/usuario.controller'


// -------------------- Utils --------------------
import encriptar from '../../utils/encriptar'
import { Rol, Permiso } from '../../Models/Usuario/RolPermiso';

// -------------------- Rutas Usuario --------------------

router.get('/',         manejadorGenerico({modelo: Usuario,     accion: manejadorGenerico.LEER}))

router.get('/:nombre',  manejadorGenerico({modelo: Usuario,     accion: manejadorGenerico.LEER_PARAMETROS}))

router.get('/:nombre/info', manejadorGenerico({
    modelo: Usuario,
    accion: manejadorGenerico.LEER_PARAMETROS,
    include: [{
        model: Rol,
        include: [{
            model: Permiso,
            through: {
                attributes: ['nivelAcceso']
            }
        }]
    }]
}))

// Crear nuevo Usuario.     Obligatorio: usuario, nombre, rolId.    Opcional: apellido
router.post('/', async (req: Request, res: Response) => {
    let {contrasena, usuario, ...elemento} = req.body

    usuario = usuario ? usuario.toLowerCase() : null
    contrasena = contrasena ? encriptar(contrasena) : null

    try {
        const resultado = await usuarioNuevo({ contrasena , usuario , ...elemento})
        res.status(201).json(resultado)
    } catch (error) {
        res.status(400).json({mensaje: 'Error'})
    }
})

// Actualizar un usuario.   Obligatorio: usuario     Opcional: campos a actualizar
router.put('/:usuario', async (req: Request, res: Response) => {
    let {contrasena, ...elemento} = req.body;
    const {usuario} = req.params
    
    contrasena = contrasena ? encriptar(contrasena) : null
 
    try {
        const resultado = await usuarioActualizar({contrasena, ...elemento}, {usuario})
        res.status(201).json(resultado)
    } catch (error) {
        console.log(error)
        res.status(400).json({mensaje: 'Error'})
    }
})

router.delete('/:usuario', manejadorGenerico({modelo: Usuario, accion: manejadorGenerico.ELIMINAR_POR_PARAMETROS}))


export default router