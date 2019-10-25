import {factoryModelNuevo, factoryModelActualizarId, factoryModelEliminarCondicionAnd, factoryModelTodos} from '../genericos.controller'
import Usuario from '../../Models/Usuario/Usuario'
import {Rol, Permiso} from '../../Models/Usuario/RolPermiso'

// Usuario
export const usuarioTodos = factoryModelTodos({modelo: Usuario})
export const usuarioNuevo = factoryModelNuevo({modelo: Usuario})
export const usuarioActualizar = factoryModelActualizarId({modelo: Usuario})
export const usuarioEliminar = factoryModelEliminarCondicionAnd({modelo: Usuario})

