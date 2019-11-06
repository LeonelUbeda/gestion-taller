import {factoryModelNuevo, factoryModelActualizarId, factoryModelEliminarCondicionAnd, factoryModelTodos, factoryModelID, factoryModelActualizarPorCampoRestriccion} from '../genericos.controller'
import { Herramienta, MovimientoHerramienta } from '../../Models/Inventario/Herramienta'
import {Rol, Permiso, RolPermiso} from '../../Models/Usuario/RolPermiso'

// Terminados
export const herramientaTodos = factoryModelTodos({modelo: Herramienta})
export const herramientoID = factoryModelID({modelo: Herramienta})
export const herramientaActualizar = factoryModelActualizarPorCampoRestriccion({modelo: Herramienta}) // esto no permite actualizar cantidad

// Esto se puede hacer generico 
export const herramientaIDMovimiento = async ( id: number ) => {
    try {
        const respuesta = await Herramienta.findOne({
            where: { id },
            include: [{
                model: MovimientoHerramienta
            }]
        })
        return respuesta
    }
    catch (error) {
        throw error
    }
}

// Se pasa el elemento que se va a insertar y el elemento de la tabla intermedia
// El id a la tabla original se añade automaticamente.
export const herramientaNuevo = async ( elemento: object, elementoMovimiento: object ) => {
    try {
        const respuesta = await Herramienta.build({ ...elemento })
        await MovimientoHerramienta.create({ herramientaId: respuesta.id ,...elementoMovimiento })
        respuesta.save();
        return respuesta;

    }
    catch (error) {
        console.log(error)
        throw error
    }
}