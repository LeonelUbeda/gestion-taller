import { factoryModelEliminarCondicionAnd, factoryModelTodos, factoryModelID, factoryModelActualizarPorCampoRestriccion} from '../genericos.controller'
import { Herramienta, MovimientoHerramienta } from '../../Models/Inventario/Herramienta'
import { Insumo } from '../../Models/Inventario/Insumo'


// Terminados
export const herramientaTodos = factoryModelTodos({modelo: Herramienta})
export const herramientaID = factoryModelID({modelo: Herramienta})
export const herramientaActualizar = factoryModelActualizarPorCampoRestriccion({modelo: Herramienta}) // esto no permite actualizar cantidad
export const herramientaEliminar = factoryModelEliminarCondicionAnd({modelo: Herramienta})

// Esto se puede hacer generico 
export const herramientaIDMovimiento = async ( id ) => {
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
        const respuesta = await Herramienta.create({ MovimientoHerramienta: [elementoMovimiento], ...elemento }, {
            include: [{
                model: MovimientoHerramienta
            }]
        })
        return respuesta;
    }
    catch (error) {
        console.log(error)
        throw error
    }
}

export const herramientaIDInsumos = async (id: number) => {
    try {
        const respuesta = await Herramienta.findOne({
            where: {id},
            include: [{
                model: Insumo   
            }]
        })
        return respuesta
    } catch (error) {
        throw error
    }
}