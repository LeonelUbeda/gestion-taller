import {Router, Response, Request} from 'express'
import verificarPermiso from '../Middlewares/verificarPermisos'
const router = Router();


// -------------------- Controladores --------------------
import {ClienteTodos, ClienteID, ClienteNuevo, ClienteEliminar, telefonoClienteEliminar, telefonoClienteNuevo, telefonoClienteTodos, telefonoClienteActualizar, telefonoBuscar} from '../Controllers/cliente.controller';





// -------------------- Rutas Clientes --------------------
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
        res.status(400).json({mensaje: 'Error'})
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







// -------------------- Rutas Telefono -------------------- 



//  Envia todos los telefonos de un determinado cliente
router.get('/:id/telefono', async(req: Request, res: Response ) => {
    const { id } = req.params
    try {
        const respuesta = await telefonoClienteTodos({ID_Cliente: id})
        res.status(200).json(respuesta)
    } catch (error) {
        console.log(error)
        res.status(400).json({mensaje: 'Error'})
    }
})



router.get('/:id/telefono', async(req: Request, res: Response ) => {
    const { id } = req.params
    try {
        const respuesta = await telefonoClienteTodos({ID_Cliente: id})
        res.status(200).json(respuesta)
    } catch (error) {
        console.log(error)
        res.status(400).json({mensaje: 'Error'})
    }
})


//  Añade un telefono al cliente especificado
router.put('/:id/telefono/:telefonoCliente', async(req: Request, res: Response ) => {
    const { telefono } = req.body
    const { id, telefonoCliente } = req.params
    try {
        const respuesta = await telefonoClienteActualizar({ telefono }, {ID_Cliente: id, telefono: telefonoCliente})
        res.status(200).json(respuesta)
    } catch (error) {
        console.log(error)
        res.status(400).json({mensaje: 'Error'})
    }
})

//  Elimina un telefono del cliente especificado
//  /api/cliente/4/telefono/22225989
router.delete('/:id/telefono/:telefono', async (req: Request, res: Response ) => {
    const { id, telefono } = req.params
    try {
        const respuesta = await telefonoClienteEliminar({ID_Cliente: id, telefono })
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(400).json({mensaje: 'Error'})
    }
})

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