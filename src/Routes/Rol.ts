import {Router, Response, Request} from 'express'
import {rolNuevo,} from '../Controllers/Usuario/rol.controller'

const router = Router();


// Crear nuevo Rol.     Obligatorio: nombre
router.post('/', async (req: Request, res: Response) => {
    const nombre = req.body
    console.log(nombre)
    try {
        const resultado = await rolNuevo(nombre)
        res.status(201).json(resultado)
        console.log(JSON.stringify(resultado))
        
    } catch (error) {
        res.status(400).json()
    }
})



export default router;