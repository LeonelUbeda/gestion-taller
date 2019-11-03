import {factoryModelNuevo, factoryModelActualizarId, factoryModelEliminarCondicionAnd, factoryModelTodos, factoryModelID, factoryModelActualizarPorCampo} from '../genericos.controller'
import Herramienta from '../../Models/Inventario/Herramienta'
import {Rol, Permiso, RolPermiso} from '../../Models/Usuario/RolPermiso'

// Usuario
export const herramientaTodos = factoryModelTodos({modelo: Herramienta})
export const herramientoID = factoryModelID({modelo: Herramienta})
export const herramientaNuevo = factoryModelNuevo({modelo: Usuario})
//export const usuarioActualizar = factoryModelActualizarId({modelo: Usuario})
export const usuarioEliminar = factoryModelEliminarCondicionAnd({modelo: Usuario})

export const usuarioActualizar = factoryModelActualizarPorCampo({modelo: Usuario})



export const herramientaNuevo = async ( usuario: string,  )

export const usuarioIDRol = async (usuario: string, ) => {
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