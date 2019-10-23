import {Router, Response, Request} from 'express'

const router = Router();

//Controladores
import {ClienteTodos, ClienteID, ClienteNuevo, ClienteEliminar} from '../Controllers/cliente.controller';

//Rutas
router.get('/', async (req: Request, res: Response) => {
    
    res.json(ClienteTodos(req.query))
});
router.get('/:id', (req: Request, res: Response) => {
    const id = req.params
    res.json(ClienteID(id))
});
router.post('/', async (req: Request, res: Response)  => {
    const { ...infoCliente } = req.body
    try {
        const respuesta = ClienteNuevo(infoCliente)
        res.send(205).json(respuesta)
    } catch (error) {
        const codigoError = 404 // Algun codigo
        res.send(codigoError).json(error)
    }
});
router.delete('/:id', ClienteEliminar)




export default router;