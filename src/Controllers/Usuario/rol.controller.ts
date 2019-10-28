import {factoryModelActualizarId, factoryModelNuevo, factoryModelEliminarCondicionAnd, factoryModelTodos, factoryModelID} from '../genericos.controller'
import {Rol} from '../../Models/Usuario/RolPermiso'


export const rolNuevo = factoryModelNuevo({modelo: Rol})
export const rolTodos = factoryModelTodos({modelo: Rol})
export const rolId = factoryModelID({modelo: Rol})
export const rolEliminar = factoryModelEliminarCondicionAnd({modelo: Rol})
export const rolActualizar = factoryModelActualizarId({modelo: Rol})