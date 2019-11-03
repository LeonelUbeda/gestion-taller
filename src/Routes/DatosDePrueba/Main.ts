import {Router, Response, Request} from 'express'
const router = Router();


// -------------------- Modelos --------------------
import Cliente from '../../Models/Cliente'

// -------------------- Datos de prueba --------------------
import ClienteDatos from './ClienteDatos'




router.get('/crear', async (req: Request, res: Response) => {
    Cliente.bulkCreate(ClienteDatos)
    res.send('CREADO')
})




export default router