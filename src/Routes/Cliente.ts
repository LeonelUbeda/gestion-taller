import {Router, Response, Request} from 'express'
import verificarPermiso from '../Middlewares/verificarPermisos'
const router = Router();
import manejadorGenerico from '../Controllers/manejadorGenerico'

// -------------------- Controladores --------------------
import {ClienteTodos, clienteActualizar, ClienteID, ClienteNuevo, ClienteEliminar, telefonoClienteEliminar, telefonoClienteNuevo, telefonoClienteTodos, telefonoClienteActualizar, telefonoBuscar} from '../Controllers/cliente.controller';
import Cliente from '../Models/Cliente';
import Telefono from '../Models/Telefono';





// -------------------- Rutas Clientes --------------------

router.get('/',     manejadorGenerico({modelo: Cliente , accion: manejadorGenerico.LEER}));

router.get('/:id',  manejadorGenerico({modelo: Cliente, accion: manejadorGenerico.LEER_POR_ID}));

router.post('/',    manejadorGenerico({modelo: Cliente, accion: manejadorGenerico.CREAR}));

router.put('/:id',  manejadorGenerico({modelo: Cliente, accion: manejadorGenerico.ACTUALIZAR_POR_ID}))

router.delete('/:id', manejadorGenerico({modelo: Cliente, accion: manejadorGenerico.ELIMINAR_POR_ID}))


// -------------------- Rutas Telefono -------------------- 

//  Todos los telefonos de un cliente
router.get('/:clienteId/telefono', async(req: Request, res: Response ) => {
    const { clienteId } = req.params
    try {
        const respuesta = await telefonoClienteTodos({clienteId})
        res.status(200).json(respuesta)
    } catch (error) {
        console.log(error)
        res.status(400).json({mensaje: 'Error'})
    }
})
 
// Crear nuevo telefono a un cliente
router.post('/:clienteId/telefono', async (req: Request, res: Response) => {
    const { clienteId } = req.params
    const {telefono} = req.body
    try {
        const respuesta = await telefonoClienteNuevo({telefono, clienteId})
        res.status(201).json(respuesta)
    } catch (error) {
        console.log(error)
        res.status(400).json({mensaje: 'Error'})
    }
})

//  Añade un telefono al cliente especificado
router.put('/:clienteId/telefono/:telefonoCliente', async(req: Request, res: Response ) => {
    const { telefono } = req.body
    const { clienteId, telefonoCliente } = req.params
    try {
        const respuesta = await telefonoClienteActualizar({ telefono }, {clienteId, telefono: telefonoCliente})
        res.status(200).json(respuesta)
    } catch (error) {
        console.log(error)
        res.status(400).json({mensaje: 'Error'})
    }
})


router.delete('/:clienteId/telefono/:telefono', manejadorGenerico({modelo: Telefono, accion: manejadorGenerico.ELIMINAR_POR_CONDICION}))

// Busca un telefono sin especificar el id de usuario (por si se necesita en algun momento)
router.get('/telefono/:telefono', async (req: Request, res: Response ) => {
    const {telefono} = req.params
    const consulta = req.query
    try {
        const respuesta = await telefonoBuscar({telefono, ...consulta})
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(400).json({mensaje: 'Error'})
    }
})

export default router;