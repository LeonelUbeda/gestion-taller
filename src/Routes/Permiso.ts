import {Router, Response, Request} from 'express'
const router = Router();
// -------------------- Controladores --------------------
import {permisoNuevo, permisoTodos, permisoId, permisoActualizar, permisoEliminar} from '../Controllers/Usuario/permiso.controller'



// -------------------- Rutas Permiso --------------------
router.get('/', async (req: Request, res: Response) => {
    const consulta = req.query
    try {
        const resultado = await permisoTodos(consulta)
        res.status(200).json(resultado)
    } catch (error) {
        res.status(400).json({mensaje: 'Error'})
    }
})

router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const resultado = await permisoId(parseInt(id))
        res.status(200).json(resultado)
    } catch (error) {
        res.status(400).json({mensaje: 'Error'})
    }                     
    
});



router.put('/:id', async (req: Request, res: Response) => {
    const elemento = req.body
    const { id } = req.params
    try {
        const resultado = await permisoActualizar({ id, ...elemento })
        res.status(200).json(resultado)
    } catch (error) {
        res.status(400).json({mensaje: 'Error'})
    }
})


// Crear nuevo Permiso.     Obligatorio: nombre
router.post('/', async (req: Request, res: Response) => {
    const elemento = req.body
    try {
        const resultado = await permisoNuevo({ ...elemento })
        res.status(201).json(resultado)
    } catch (error) {
        res.status(400).json({mensaje: 'Error'})
    }
})

router.delete('/:id', async (req: Request, res: Response ) => {
    const { id } = req.params
    try {
        const resultado = await permisoEliminar({id})
        res.status(200).json(resultado)
    } catch (error) {
        res.status(400).json({mensaje: 'Error'})
    }
})

export default router;