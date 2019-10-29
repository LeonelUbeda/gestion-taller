import {Router, Response, Request} from 'express'

import {Rol, RolPermiso, Permiso} from '../Models/Usuario/RolPermiso'
import {usuarioNuevo, usuarioActualizar, usuarioEliminar, usuarioTodos} from '../Controllers/Usuario/usuario.controller'

const router = Router();







// Crear nuevo Usuario.     Obligatorio: usuario, nombre, rolId.    Opcional: apellido
router.post('/', async (req: Request, res: Response) => {
    const elemento = req.body
    console.log(elemento)
    try {
        const resultado = await usuarioNuevo({ ...elemento })
        res.status(201).json(resultado)

    } catch (error) {
        res.status(400).json({mensaje: 'Error'})
    }
})


// Obtener todos los usuarios
router.get('/', async (req: Request, res: Response) => {
    const consulta = req.params
    try {
        const resultado = await usuarioTodos(consulta)
        res.status(200).json(resultado)
    } catch (error) {
        res.status(400).json({mensaje: 'Error'})
    }
})

// Actualizar un usuario.   Obligatorio: id     Opcional: campos a actualizar
router.put('/', async (req: Request, res: Response) => {
    const { id, ...elemento} = req.body;
    try {
        const resultado = await usuarioActualizar({id, ...elemento})
        res.status(201).json(resultado)

    } catch (error) {
        console.log(error)
        res.status(400).json({mensaje: 'Error'})
    }
})

// Elimina un usuario. Se obtiene el id por los parametros de url
router.delete('/:id', async (req: Request, res: Response) => {
    const {id} = req.params
    
    try {
        const resultado = await usuarioEliminar({id})
        res.status(200).json({mensaje: 'Eliminado'})
    } catch (error) {
        res.status(400).json({mensaje: 'Error'})
        
    }
})







export default router