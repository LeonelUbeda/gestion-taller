import {Router, Response, Request} from 'express'
const router = Router();


// -------------------- Controladores --------------------
import {usuarioNuevo, usuarioActualizar, usuarioEliminar, usuarioTodos, usuarioID, usuarioIDRol} from '../Controllers/Usuario/usuario.controller'


// -------------------- Utils --------------------
import encriptar from '../utils/encriptar'






// -------------------- Rutas Usuario --------------------

// Obtener todos los usuarios
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


// Crear nuevo Usuario.     Obligatorio: usuario, nombre, rolId.    Opcional: apellido
router.post('/', async (req: Request, res: Response) => {

    let {usuario, nombre, rolId, apellido, contrasena} = req.body

    if(contrasena){
        contrasena = encriptar(contrasena)
    }
    try {
        const resultado = await usuarioNuevo({ usuario, nombre, rolId, apellido, contrasena })
        res.status(201).json(resultado)
    } catch (error) {
        res.status(400).json({mensaje: 'Error'})
    }
})

// Actualizar un usuario.   Obligatorio: usuario     Opcional: campos a actualizar
router.put('/:usuario', async (req: Request, res: Response) => {
    const elemento = req.body;
    const {usuario} = req.params
    console.log(elemento)
 
    try {
        const resultado = await usuarioActualizar(elemento, {usuario})
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