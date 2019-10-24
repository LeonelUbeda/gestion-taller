import {Router, Response, Request} from 'express'

const router = Router();

//Controladores
import {ClienteTodos, ClienteID, ClienteNuevo, ClienteEliminar} from '../Controllers/cliente.controller';

//Rutas
router.get('/', async (req: Request, res: Response) => {
    res.json(await ClienteTodos(req.query))
});

router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params                              // Destructurar para que sea mas legible
    res.json(await ClienteID(parseInt(id)))
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