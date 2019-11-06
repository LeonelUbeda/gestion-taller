import {factoryModelNuevo, factoryModelTodos, factoryModelActualizarId, factoryModelEliminarCondicionAnd, factoryModelID} from '../genericos.controller'

import Categoria from '../../Models/Servicio/Categoria'



export const categoriaNuevo = factoryModelNuevo({modelo: Categoria})
export const categoriaTodos = factoryModelTodos({modelo: Categoria})
export const categoriaActualizar = factoryModelActualizarId({modelo: Categoria})
export const categoriaEliminar = factoryModelEliminarCondicionAnd({modelo: Categoria})
export const categoriaId = factoryModelID({modelo: Categoria})