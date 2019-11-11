import {Router, Response, Request} from 'express'
const router = Router();
import manejadorGenerico from '../../Controllers/manejadorGenerico'


// -------------------- Controladores --------------------
import { herramientaNuevo, herramientaActualizar } from '../../Controllers/Inventario/herramienta.controller'
import { Herramienta, MovimientoHerramienta } from '../../Models/Inventario/Herramienta'




// -------------------- Rutas Herramienta --------------------

router.get('/',     manejadorGenerico({modelo: Herramienta , accion: manejadorGenerico.LEER}));

router.get('/movimiento/', manejadorGenerico({modelo: MovimientoHerramienta, accion: manejadorGenerico.LEER}))

router.get('/:id',  manejadorGenerico({modelo: Herramienta, accion: manejadorGenerico.LEER_POR_ID}));

router.post('/',    async (req: Request, res: Response) => {
    const elemento = req.body
    const elementoMovimiento = { tipo: "entrada",
                                 razon : elemento.hasOwnProperty("razon") ? elemento.razon : "Ingreso inicial",
                                 usuario: elemento.usuario,
                                 cantidad: elemento.cantidad }
    try {
        const respuesta = await herramientaNuevo( elemento, elementoMovimiento )
        res.status(201).json(respuesta)
    } catch (error) {
        console.log(error)
        res.status(400).json({mensaje: 'Error'})
    }
})

router.put('/:id',  async (req: Request, res: Response) => {
    const { id } = req.params
    const elemento = req.body
    try {
        const respuesta = await herramientaActualizar( elemento, { id }, ["cantidad"] )
        res.status(201).json(respuesta)
    } catch (error) {
        console.log(error)
        res.status(400).json({mensaje: 'Error'})
    }
})

router.delete('/:id', manejadorGenerico({modelo: Herramienta, accion: manejadorGenerico.ELIMINAR_POR_ID}))

router.get('/:id/movimiento', manejadorGenerico({
    modelo: Herramienta, 
    accion: manejadorGenerico.LEER_POR_ID, 
    include: [{
        model: MovimientoHerramienta
    }]
}))





export default router