import {factoryModelNuevo, factoryModelEliminarCondicionAnd, factoryModelTodos, factoryModelID, factoryModelActualizarPorCampo} from '../genericos.controller'
import {RolPermiso} from '../../Models/Usuario/RolPermiso'


export const rolPermisoNuevo = factoryModelNuevo({modelo: RolPermiso})
export const rolPermisoTodos = factoryModelTodos({modelo: RolPermiso})
export const rolPermisoEliminar = factoryModelEliminarCondicionAnd({modelo: RolPermiso})
export const rolPermisoActualizar = factoryModelActualizarPorCampo({modelo: RolPermiso})