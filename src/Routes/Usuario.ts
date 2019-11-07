import {Router, Response, Request} from 'express'
const router = Router();

import manejadorGenerico from '../Controllers/manejadorGenerico'
import Usuario from '../Models/Usuario/Usuario';

// -------------------- Controladores --------------------
import {usuarioNuevo, usuarioActualizar, usuarioEliminar, usuarioTodos, usuarioID, usuarioIDRol} from '../Controllers/Usuario/usuario.controller'


// -------------------- Utils --------------------
import encriptar from '../utils/encriptar'

// -------------------- Rutas Usuario --------------------

router.get('/',     manejadorGenerico({modelo: Usuario,     accion: manejadorGenerico.LEER}))
router.get('/:nombre',  manejadorGenerico({modelo: Usuario,  accion: manejadorGenerico.LEER_POR_ID}))


// Obtener todos los usuarios
/*
router.get('/', async (req: Request, res: Response) => {
    const consulta = req.query
    try {
        const resultado = await usuarioTodos(consulta)
        res.status(200).json(resultado)
    } catch (error) {
        res.status(400).json({mensaje: 'Error'})
    }
})

// Obtener todos los usuarios
router.get('/:usuario', async (req: Request, res: Response) => {
    const { usuario } = req.params
    try {
        const resultado = await usuarioIDRol(usuario)
        res.status(200).json(resultado)
    } catch (error) {
        res.status(400).json({mensaje: 'Error'})
    }
})
*/

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

router.delete('/:usuario', manejadorGenerico({modelo: Usuario, accion: manejadorGenerico.ELIMINAR_POR_CONDICION}))






export default router