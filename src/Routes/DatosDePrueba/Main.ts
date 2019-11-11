import {Router, Response, Request} from 'express'
const router = Router();


// -------------------- Modelos --------------------
import Cliente from '../../Models/Cliente'

// -------------------- Datos de prueba --------------------
import {ClienteDatos, MarcaAutos, ModeloAutos} from './Datos genericos'
import Marca from '../../Models/Vehiculo/Marca';
import Modelo from '../../Models/Vehiculo/Modelo';




router.get('/crear', async (req: Request, res: Response) => {
    Cliente.bulkCreate(ClienteDatos)
    Marca.bulkCreate(MarcaAutos)
    Modelo.bulkCreate(ModeloAutos)
    res.send('CREADO')
})




export default router