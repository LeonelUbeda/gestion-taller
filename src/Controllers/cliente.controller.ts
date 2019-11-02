
// -------------------- Modelos --------------------
import Cliente from '../Models/Cliente'
import Telefono from '../Models/Telefono';

// -------------------- Controladores Genéricos --------------------
import { factoryModelTodos, factoryModelID, factoryModelEliminarCondicionAnd, factoryModelNuevo, factoryModelActualizarPorCampo, factoryModelActualizarId } from './genericos.controller'


// -------------------- Controladores Cliente --------------------
export const ClienteTodos = factoryModelTodos({modelo: Cliente})
export const ClienteID = factoryModelID({modelo: Cliente})
export const ClienteEliminar = factoryModelEliminarCondicionAnd({modelo: Cliente})
export const clienteActualizar = factoryModelActualizarId({modelo: Cliente})
export const ClienteNuevo = async (infoCliente: object) => {
    try {
        const resultado = await Cliente.create( { ... infoCliente, fechaRegistro: new Date() } )
        return resultado
    } catch (error) {
        console.log(error)
        throw error
    }
}


// -------------------- Controladores Telefono --------------------
export const telefonoClienteEliminar = factoryModelEliminarCondicionAnd({modelo: Telefono})
export const telefonoClienteNuevo = factoryModelNuevo({modelo: Telefono})
export const telefonoClienteTodos = factoryModelTodos({modelo: Telefono})
export const telefonoClienteActualizar = factoryModelActualizarPorCampo({modelo: Telefono})
export const telefonoBuscar = factoryModelTodos({modelo: Telefono})