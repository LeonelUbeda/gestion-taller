import {factoryModelNuevo, factoryModelTodos, factoryModelActualizarId, factoryModelEliminarCondicionAnd, factoryModelID} from '../genericos.controller'

import { UnidadDeMedida } from '../../Models/Inventario/Insumo'



export const unidadMedidaNuevo = factoryModelNuevo({modelo: UnidadDeMedida})
export const unidadMedidaTodos = factoryModelTodos({modelo: UnidadDeMedida})
export const unidadMedidaActualizar = factoryModelActualizarId({modelo: UnidadDeMedida})
export const unidadMedidaEliminar = factoryModelEliminarCondicionAnd({modelo: UnidadDeMedida})
export const unidadMedidaId = factoryModelID({modelo: UnidadDeMedida})