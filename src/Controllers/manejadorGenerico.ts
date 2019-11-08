import { factoryModelNuevo, factoryModelTodos, factoryModelActualizarId, factoryModelEliminarCondicionAnd, factoryModelID, factoryModelActualizarPorCampo } from './genericos.controller'
import {Request, Response} from 'express'


const manejadorGenerico = ({modelo, accion, include = []}) => {
    const HTTP = {
        // Retorna los registros que coinciden con las variables del req.query
        // 
        leer: async (req: Request, res: Response) => {
            const consulta = req.query;
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
            const modeloTodosId = factoryModelID({modelo})
            try {
                const resultado = await modeloTodosId(parseInt(id))
                res.status(200).json(resultado)
            } catch (error) {
                res.status(400).json({mensaje: 'Error'})
                
            }
        },
        // Retorna los registros que coinciden con los parametros en req.params
        // Ademas hace la busqueda por req.query
        leerParametros: async (req: Request, res: Response) => {
            const consulta = req.query;
            const parametros = req.params;
            const modeloLeer = factoryModelTodos({modelo, include})
            try {
                const resultado = await modeloLeer({ ...consulta, ...parametros })
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
        //
        actualizarPorId: async (req: Request, res: Response) => {
            const identificador = req.params
            const elemento = req.body;
            const modeloActualizar = factoryModelActualizarId({modelo})
            try {
                const resultado = await modeloActualizar({...identificador, ...elemento})
                res.status(201).json(resultado)
            } catch (error) {
                res.status(400).json({mensaje: 'Error'})
            }
        },

        // Actualiza todos los registros que coinciden con los parametros en req.params
        // La variable tiene que ser la misma que en la tabla. Ejemplo. Tabla telefono: clienteId, telefono
        // /api/cliente/:clienteId/telefono/:telefono da como resultado where: {clienteId: clienteId, telefono: telefono}
        // de otra forma el where será invalido
        actualizarPorParametros: async (req: Request, res: Response) => {
            const identificador = req.params
            const camposActualizar = req.body;
            const modeloActualizar = factoryModelActualizarPorCampo({modelo})
            try {
                const resultado = await modeloActualizar(camposActualizar ,identificador)
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
        // Elimina por condiciones que estan en los parametros
        eliminarPorCondicion: async (req: Request, res: Response) => {
            const condiciones = req.params
            const modeloEliminar = factoryModelEliminarCondicionAnd({modelo})
            try {
                const resultado = await modeloEliminar(condiciones)
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
manejadorGenerico.LEER_PARAMETROS =     'leerParametros'

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