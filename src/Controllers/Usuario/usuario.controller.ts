import {factoryModelNuevo, factoryModelActualizarId, factoryModelEliminarCondicionAnd, factoryModelTodos, factoryModelID, factoryModelActualizarPorPK} from '../genericos.controller'
import Usuario from '../../Models/Usuario/Usuario'
import {Rol, Permiso, RolPermiso} from '../../Models/Usuario/RolPermiso'

// Usuario
export const usuarioTodos = factoryModelTodos({modelo: Usuario})
export const usuarioNuevo = factoryModelNuevo({modelo: Usuario})
//export const usuarioActualizar = factoryModelActualizarId({modelo: Usuario})
export const usuarioEliminar = factoryModelEliminarCondicionAnd({modelo: Usuario})
export const usuarioID = factoryModelID({modelo: Usuario})
export const usuarioActualizar = factoryModelActualizarPorPK({modelo: Usuario})



export const usuarioIDRol = async (usuario: string) => {
    try {
        const respuesta = await Usuario.findOne({
            where: {usuario},
            include: [{
                model: Rol,
                include: [{
                    model: Permiso,
                    through: {
                        attributes: ['nivelAcceso']
                    }
                }]
            }]
        })
        return respuesta
    } catch (error) {
        throw error
    }
}