import {Router, Response, Request} from 'express'
import verificarPermiso from '../Middlewares/verificarPermisos'
const router = Router();

//Controladores
import {ClienteTodos, ClienteID, ClienteNuevo, ClienteEliminar, telefonoClienteEliminar, telefonoClienteNuevo} from '../Controllers/cliente.controller';

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

router.get('/:id',/* verificarPermiso('managerrr', 5) , */ async (req: Request, res: Response) => {
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

router.delete('/:id', async (req: Request, res: Response ) => {
    const { id } = req.params
    try {
        const respuesta = await ClienteEliminar({id})
        res.status(200).json(respuesta)
    } catch (error) {
        
    }
})



// TELEFONO


router.post('/telefono', async(req: Request, res: Response ) => {
    const {telefono, id} = req.body
    try {
        const respuesta = await telefonoClienteNuevo({ID_Cliente: id, telefono})
        res.status(201).json(respuesta)
    } catch (error) {
        console.log(error)
        res.status(400).json({mensaje: 'Error'})
    }
})


router.delete('/:id/:telefono', async (req: Request, res: Response ) => {
    const { id, telefono } = req.params
    try {
        const respuesta = await telefonoClienteEliminar({ID_Cliente: id, telefono })
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(400).json({mensaje: 'Error'})
    }
})




export default router;