import {factoryModelActualizarId, factoryModelNuevo, factoryModelEliminarCondicionAnd, } from '../genericos.controller'
import {Permiso} from '../../Models/Usuario/RolPermiso'

export const permisoNuevo = factoryModelNuevo({modelo: Permiso})