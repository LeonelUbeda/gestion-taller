import {Router, Response, Request} from 'express'

const router = Router();

//Controladores
import {ClienteTodos, ClienteID, ClienteNuevo, ClienteEliminar} from '../Controllers/cliente.controller';

//Rutas
router.get('/', ClienteTodos);
router.get('/:id', ClienteID);
router.post('/', ClienteNuevo);
router.delete('/:id', ClienteEliminar)




export default router;