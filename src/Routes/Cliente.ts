import {Router, Response, Request} from 'express'

const router = Router();

//Controladores
import {ClienteTodos, ClienteID, ClienteNuevo, ClienteEliminar} from '../Controllers/cliente.controller';

//Rutas
router.get('/', async (req: Request, res: Response) => {
    const consulta = req.query
    try {
        const resultado = await ClienteTodos(consulta)
        res.status(200).json(resultado)
    } catch (error) {
        res.status(400).json({mensaje: 'Error'})
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params        
    try {
        const resultado = await ClienteID(parseInt(id))
        res.status(200).json(resultado)
    } catch (error) {
        res.status(400).json({mensaje: 'Error'})
    }                     
    
});

router.post('/', async (req: Request, res: Response)  => {
    const { ...infoCliente } = req.body
    try {
        const respuesta = await ClienteNuevo(infoCliente)
        res.status(205).json(respuesta)
    } catch (error) {
        const codigoError = 404 // Algun codigo
        res.status(codigoError).json(error)
    }
});

router.delete('/:id', ClienteEliminar)




export default router;