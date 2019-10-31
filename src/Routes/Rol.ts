import {Router, Response, Request} from 'express'

const router = Router();


// -------------------- Controladores --------------------
import {rolNuevo, rolTodos, rolId, rolEliminar, rolActualizar} from '../Controllers/Usuario/rol.controller'



// -------------------- Rutas Rol --------------------

// Ruta generica para buscar roles
router.get('/', async (req: Request, res: Response) => {
    const consulta = req.query
    try {
        const resultado = await rolTodos(consulta)
        res.status(200).json(resultado)
    } catch (error) {
        res.status(400).json({mensaje: 'Error'})
    }
});


router.get('/:id', async (req: Request, res: Response) => {
    const {id} = req.params
    try {
        const resultado = await rolId(parseInt(id))
        res.status(200).json(resultado)
    } catch (error) {
        res.status(400).json({mensaje: 'Error'})
    }
});


// Crear nuevo Rol.     Obligatorio: nombre
router.post('/', async (req: Request, res: Response) => {
    const elemento = req.body
    try {
        const resultado = await rolNuevo({...elemento})
        res.status(201).json(resultado) 
    } catch (error) {
        res.status(400).json({mensaje: 'Error'})
    }
})


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


router.delete('/:id', async (req: Request, res: Response) => {
    const {id} = req.params
    try {
        const resultado = await rolEliminar({id})
        res.status(200).json(resultado)
    } catch (error) {
        res.status(400).json({mensaje: 'Error'})
        
    }
})


export default router;