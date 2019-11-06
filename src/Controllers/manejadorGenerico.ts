import { factoryModelNuevo, factoryModelTodos, factoryModelActualizarId, factoryModelEliminarCondicionAnd } from './genericos.controller'
import {Request, Response} from 'express'


const manejadorGenerico = ({modelo, accion, include = []}) => {
    const HTTP = {
        leer: async (req: Request, res: Response) => {
            const consulta = req.query
            const modeloLeer = factoryModelTodos({modelo, include})
            try {
                const resultado = await modeloLeer(consulta)
                res.status(200).json(resultado)
            } catch (error) {
                res.status(400).json({mensaje: 'Error'})
            }
        },
        leerId: async (req: Request, res: Response) => {
            const {id} = req.params
            const modeloTodosId = factoryModelTodos({modelo})
            try {
                const resultado = await modeloTodosId({id})
                res.status(200).json(resultado)
            } catch (error) {
                res.status(400).json({mensaje: 'Error'})
                
            }
        },
        crear: async (req: Request, res: Response) => {
            const elemento = req.body
            console.log(elemento)
            const modeloCrear = factoryModelNuevo({modelo})
            try {
                const resultado = await modeloCrear({...elemento})
                res.status(201).json(resultado) 
            } catch (error) {
                res.status(400).json({mensaje: 'Error'})
            }
        },
        actualizarPorId: async (req: Request, res: Response) => {
            const { id } = req.params
            const elemento = req.body;
            const modeloActualizar = factoryModelActualizarId({modelo})
            try {
                const resultado = await modeloActualizar({id, ...elemento})
                res.status(201).json(resultado)
            } catch (error) {
                res.status(400).json({mensaje: 'Error'})
            }
        },
        eliminarPorId: async (req: Request, res: Response) => {
            const {id} = req.params
            const modeloEliminar = factoryModelEliminarCondicionAnd({modelo})
            try {
                const resultado = await modeloEliminar({id})
                res.status(200).json(resultado)
            } catch (error) {
                res.status(400).json({mensaje: 'Error'})
                
            }
        },
        eliminarPorCondicion: async (req: Request, res: Response) => {
            const condiciones = req.params
            const modeloEliminar = factoryModelEliminarCondicionAnd({modelo})
            try {
                const resultado = await modeloEliminar({...condiciones})
                res.status(200).json(resultado)
            } catch (error) {
                res.status(400).json({mensaje: 'Error'})
                
            }
        }
        
        
    }
    
    return HTTP[accion]
    
}

manejadorGenerico.LEER =                'leer'
manejadorGenerico.LEER_POR_ID =         'leerId'
manejadorGenerico.CREAR =               'crear'
manejadorGenerico.ACTUALIZAR =          'actualizar'
manejadorGenerico.ELIMINAR =            'eliminar'
manejadorGenerico.ELIMINAR_POR_ID =     'eliminarPorId'
manejadorGenerico.ELIMINAR_POR_CONDICION = 'eliminarPorCondicion'
manejadorGenerico.ACTUALIZAR_POR_ID =   'actualizarPorId'


export default manejadorGenerico




/*

const elemento = req.body;
    const { id } = req.params
    try {
        const resultado = await rolActualizar({id, ...elemento})
        res.status(201).json(resultado)
    } catch (error) {
        res.status(400).json({mensaje: 'Error'})
    }


*/