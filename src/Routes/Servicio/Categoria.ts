import {Router, Response, Request} from 'express'

const router = Router();
import { categoriaTodos, categoriaId, categoriaNuevo, categoriaActualizar } from '../../Controllers/Servicio/categoria.controller'
import Categoria from '../../Models/Servicio/Categoria';
import generico from '../../Controllers/generico'

// Ruta generica para buscar roles




router.post('/', generico({modelo: Categoria, accion: generico.crear}))
router.get('/', generico({modelo: Categoria, accion: generico.leer}))
router.put('/:id', generico({modelo: Categoria, accion: generico.actualizarPorId}))






/*
router.get('/', async (req: Request, res: Response) => {
    const consulta = req.query
    try {
        const resultado = await categoriaTodos(consulta)
        res.status(200).json(resultado)
    } catch (error) {
        res.status(400).json({mensaje: 'Error'})
    }
});



*/




router.get('/:id', async (req: Request, res: Response) => {
    const {id} = req.params
    try {
        const resultado = await categoriaId(parseInt(id))
        res.status(200).json(resultado)
    } catch (error) {
        res.status(400).json({mensaje: 'Error'})
    }
});

// Crear nuevo Rol.     Obligatorio: nombre
router.post('/', async (req: Request, res: Response) => {
    const elemento = req.body
    try {
        const resultado = await categoriaNuevo({...elemento})
        res.status(201).json(resultado) 
    } catch (error) {
        res.status(400).json({mensaje: 'Error'})
    }
})



// Actualizar un rol.   Obligatorio: id     Opcional: campos a actualizar
router.put('/:id', async (req: Request, res: Response) => {
    const elemento = req.body
    const { id } = req.params
    try {
        const resultado = await categoriaActualizar({id, ...elemento})
        res.status(201).json(resultado)
    } catch (error) {
        res.status(400).json({mensaje: 'Error'})
    }
})






export default router