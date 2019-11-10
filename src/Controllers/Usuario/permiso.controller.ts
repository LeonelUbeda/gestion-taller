
// SIN UTILIZAR. BORRAR PROXIMAMENTE
// SIN UTILIZAR. BORRAR PROXIMAMENTE
// SIN UTILIZAR. BORRAR PROXIMAMENTE
// SIN UTILIZAR. BORRAR PROXIMAMENTE

import {factoryModelActualizarId, factoryModelNuevo, factoryModelEliminarCondicionAnd, factoryModelTodos, factoryModelID, } from '../genericos.controller'
import {Permiso} from '../../Models/Usuario/RolPermiso'

export const permisoNuevo = factoryModelNuevo({modelo: Permiso})
export const permisoTodos = factoryModelTodos({modelo: Permiso})
export const permisoId = factoryModelID({modelo: Permiso})
export const permisoEliminar = factoryModelEliminarCondicionAnd({modelo: Permiso})
export const permisoActualizar = factoryModelActualizarId({modelo: Permiso})