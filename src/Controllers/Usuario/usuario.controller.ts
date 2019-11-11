import {factoryModelNuevo, factoryModelActualizarPorCampo} from '../genericos.controller'
import Usuario from '../../Models/Usuario/Usuario'

// Usuario
export const usuarioNuevo = factoryModelNuevo({modelo: Usuario})
export const usuarioActualizar = factoryModelActualizarPorCampo({modelo: Usuario})