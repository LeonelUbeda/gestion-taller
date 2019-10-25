import {factoryModelActualizarId, factoryModelNuevo, factoryModelEliminarCondicionAnd, } from '../genericos.controller'
import {Rol} from '../../Models/Usuario/RolPermiso'

export const rolNuevo = factoryModelNuevo({modelo: Rol})
