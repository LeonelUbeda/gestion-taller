import {Router, Response, Request} from 'express'
import {rolNuevo, rolTodos, rolId, rolEliminar, rolActualizar} from '../Controllers/Usuario/rol.controller'

const router = Router();




// Ruta generica para buscar roles
router.get('/', async (req: Request, res: Response) => {
    const consulta = req.query
    res.json(await rolTodos(consulta))
});





router.get('/:id', async (req: Request, res: Response) => {
    const {id} = req.params
    res.json(await rolId(parseInt(id)))
});


// Crear nuevo Rol.     Obligatorio: nombre
router.post('/', async (req: Request, res: Response) => {
    const nombre = req.body
    console.log(nombre)
    try {
        const resultado = await rolNuevo(nombre)
        res.status(201).json(resultado)
        console.log(JSON.stringify(resultado))
        
    } catch (error) {
        res.status(400).json()
    }
})


// Actualizar un rol.   Obligatorio: id     Opcional: campos a actualizar
router.put('/:id', async (req: Request, res: Response) => {
    const {...elemento} = req.body;
    const { id } = req.params
    try {
        const resultado = await rolActualizar({id, ...elemento})
        res.status(201).json(resultado)

    } catch (error) {
        console.log(error)
        res.status(400).json({mensaje: 'Error'})
    }
})


router.delete('/:id', async (req: Request, res: Response) => {
    const {id} = req.params
    
    try {
        const resultado = await rolEliminar({id})
        res.status(200).json({mensaje: 'Eliminado'})
    } catch (error) {
        res.status(400).json({mensaje: 'Error'})
        
    }
})


export default router;