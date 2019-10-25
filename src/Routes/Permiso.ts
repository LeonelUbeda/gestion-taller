import {Router, Response, Request} from 'express'
import {permisoNuevo} from '../Controllers/Usuario/permiso.controller'

const router = Router();

// Crear nuevo Permiso.     Obligatorio: nombre
router.post('/', async (req: Request, res: Response) => {
    const elemento = req.body
    console.log(elemento)
    try {
        const resultado = await permisoNuevo({ ...elemento })
        res.status(201).json(resultado)
    } catch (error) {
        res.status(400).json({mensaje: 'Error'})
    }

})


export default router;