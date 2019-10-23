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
router.post('/', ClienteNuevo);
router.delete('/:id', ClienteEliminar)




export default router;