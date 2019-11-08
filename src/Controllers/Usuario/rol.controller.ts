
// SIN UTILIZAR. BORRAR PROXIMAMENTE
// SIN UTILIZAR. BORRAR PROXIMAMENTE
// SIN UTILIZAR. BORRAR PROXIMAMENTE
// SIN UTILIZAR. BORRAR PROXIMAMENTE

import {factoryModelActualizarId, factoryModelNuevo, factoryModelEliminarCondicionAnd, factoryModelTodos, factoryModelID} from '../genericos.controller'
import {Rol, Permiso} from '../../Models/Usuario/RolPermiso'


export const rolNuevo = factoryModelNuevo({modelo: Rol})
export const rolTodos = factoryModelTodos({modelo: Rol})
export const rolId = factoryModelID({modelo: Rol})
export const rolEliminar = factoryModelEliminarCondicionAnd({modelo: Rol})
export const rolActualizar = factoryModelActualizarId({modelo: Rol})
export const rolPermiso = factoryModelTodos({modelo: Rol, include: [{model: Permiso, through: { attributes: ['nivelAcceso'] }}]})