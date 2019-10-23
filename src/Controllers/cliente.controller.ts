
import {Response, Request} from 'express'
import Cliente from '../Models/Cliente'
import TipoCliente from '../Models/Interfaces/Cliente.interface'
import { factoryModelTodos, factoryModelID } from './genericos.controller'

// Factory Model Todos


const ClienteTodos = factoryModelTodos({modelo: Cliente})

const ClienteID = factoryModelID({ modelo: Cliente})


const ClienteNuevo = async (req: Request, res: Response) => {
    const { ...infoCliente } = req.body
    try {
        const resultado = await Cliente.create( { ... infoCliente, fechaRegistro: new Date() } )
        res.status(205).json(resultado)
    } catch (error) {
        console.log(error)
    }

}



const ClienteEliminar = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const resultado = await Cliente.destroy({ where: { id } });
        console.log(resultado)
        res.json(resultado)
    } catch (error) {
        console.log(error)
    }

}

export {ClienteTodos, ClienteID, ClienteNuevo, ClienteEliminar, factoryModelTodos}