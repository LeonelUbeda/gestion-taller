import { factoryModelEliminarCondicionAnd, factoryModelTodos, factoryModelID, factoryModelActualizarPorCampoRestriccion} from '../genericos.controller'
import { Herramienta } from '../../Models/Inventario/Herramienta'
import { Insumo, MovimientoInsumo } from '../../Models/Inventario/Insumo'


// Terminados
export const insumoTodos = factoryModelTodos({modelo: Herramienta})
export const insumoID = factoryModelID({modelo: Herramienta})
export const insumoActualizar = factoryModelActualizarPorCampoRestriccion({modelo: Herramienta}) // esto no permite actualizar cantidad
export const insumoEliminar = factoryModelEliminarCondicionAnd({modelo: Herramienta})

// Esto se puede hacer generico 
export const insumoIDMovimiento = async ( id: number ) => {
    try {
        const respuesta = await Herramienta.findOne({
            where: { id },
            include: [{
                model: MovimientoInsumo
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
export const insumoNuevo = async ( elemento: object, elementoMovimiento: object ) => {
    try {
        const respuesta = await Herramienta.build({ ...elemento })
        await MovimientoInsumo.create({ herramientaId: respuesta.id ,...elementoMovimiento })
        respuesta.save();
        return respuesta;

    }
    catch (error) {
        console.log(error)
        throw error
    }
}

export const insumoIDHerramienta = async (id: number) => {
    try {
        const respuesta = await Insumo.findOne({
            where: {id},
            include: [{
                model: Herramienta   
            }]
        })
        return respuesta
    } catch (error) {
        throw error
    }
}

