import { factoryModelNuevo, factoryModelTodos, factoryModelActualizarId } from '../Controllers/genericos.controller'
import {Request, Response} from 'express'

const generico = ({modelo, accion, include = []}) => {
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
        crear: async (req: Request, res: Response) => {
            const elemento = req.body
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
        }
        
        
    }
    
    return HTTP[accion]
}

generico.leer = 'leer'
generico.crear = 'crear'
generico.actualizar = 'actualizar'
generico.eliminar = 'eliminar'
generico.actualizarPorId = 'actualizarPorId'
export default generico




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