
import {Response, Request} from 'express'
import Cliente from '../Models/Cliente'
import TipoCliente from '../Models/Interfaces/Cliente.interface'
import { factoryModelTodos, factoryModelID, factoryModelEliminarCondicionAnd, factoryModelNuevo } from './genericos.controller'
import Telefono from '../Models/Telefono';

// Factory Model Todos


export const ClienteTodos = factoryModelTodos({modelo: Cliente})

export const ClienteID = factoryModelID({modelo: Cliente})

export const ClienteEliminar = factoryModelEliminarCondicionAnd({modelo: Cliente})

export const ClienteNuevo = async (infoCliente) => {
    try {
        const resultado = await Cliente.create( { ... infoCliente, fechaRegistro: new Date() } )
       return resultado
    } catch (error) {
        return error
    }
}




// TELEFONO

export const telefonoClienteEliminar = factoryModelEliminarCondicionAnd({modelo: Telefono})
export const telefonoClienteNuevo = factoryModelNuevo({modelo: Telefono})