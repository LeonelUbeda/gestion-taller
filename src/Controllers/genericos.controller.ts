import {Op} from 'sequelize'

export const factoryModelTodos = ({ modelo,  include = [] }) =>  {  // Solo para busquedas de Where x = y and ... and ...
    return async ({ limite = '10', offset = '0', ...busqueda }) => {
        let busquedaSubstring = {}
        
        for(let propiedad in busqueda){

            busquedaSubstring[propiedad] = (propiedad.slice(propiedad.length-2) === 'Id' || propiedad === 'id') ? busqueda[propiedad] : { [Op.substring] : busqueda[propiedad] }  

        }
        try {
            const respuesta = await modelo.findAll({
                where: busquedaSubstring,
                limit: parseInt(limite),
                offset: parseInt(offset),
                include
            });
            return respuesta
        } catch (error) {
            console.log(error)
            throw error
        }
    }
} 


export const factoryModelID = ({ modelo,  include = []  }) => {
    return async (id : number) => {
        try {
            const respuesta = await modelo.findOne({ where: { id } , include})
            return respuesta
        } catch (error) {
            console.log(error)
            throw error
        }
    } 
}

// Recibe todos los campos de la tabla. Si no se pasa un campo obligatorio manda un error
export const factoryModelNuevo = ({ modelo }) => {
    return async (elemento: object) => {
        try {
            const respuesta = await modelo.create({ ...elemento })
            return respuesta
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

/* WIP no se si sea necesario la verdad, luego de terminar lo de inventario veo si la implemento
// Recibe los campos de la tabla principal y la de su tabla de movimiento. 
export const factoryModelNuevoMovimiento = ({ modelo, modeloMovimiento, llaveForanea = "string" }) => {
    return async ( elemento: object, elementoMovimiento: object ) => {
        try {
            const respuesta = await modelo.build({ ...elemento })
            const trasanccionMovimiento = await modeloMovimiento.build({ ...elementoMovimiento })
        }
        catch (error) {
            console.log(error)
            throw error
        }
    }
}
*/

// Recibe un id y los campos a actualizar con sus respectivos valores
// {id: 4, nombre: 'Ricardo',  apellido: 'Juancho'}
// Se tomará nombre y apellido como parte de los campos a actualizar y el ID como la condición (where)
export const factoryModelActualizarId = ({ modelo }) => {
    return async ({id, ...camposActualizar}) => {
        try {
            const respuesta = await modelo.update(camposActualizar, {where: { id }})
            console.log(respuesta)
            return respuesta
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}


// Funcion para actualizar tablas con una condición. 
// Se creó porque habian tablas que la llave primaria NO eran números incrementales
// Recibe un objeto con los campos a actualizar y un objeto con la condición
// camposActualizar: {direccion: 'Mi casita'} / condicion: {nombre: 'Developer'}
export const factoryModelActualizarPorCampo = ({ modelo }) => {
    return async (camposActualizar: object, condicion: object) => {
        try {
            // Esto hace un: 
            // UPDATE modelo SET camposActualizar WHERE campo = valor
            const respuesta = await modelo.update({ ...camposActualizar }, {where: { ...condicion } })
            return respuesta
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

// El mismo factoryModelPorCampo, con la diferencia es que tiene un campo restriccion.
// Esto la verdad creo que puede incluirse en la funcion anterior, dejando el campo
// restriccion con un default vacio.
// No se si deberia de la restriccion tendria que llamarse desde el controlador o la ruta.
export const factoryModelActualizarPorCampoRestriccion = ({ modelo }) => {
    return async (camposActualizar: object, condicion: object, restricciones: string[]) => {
        try {
            for (let restriccion of restricciones ) {
                if (camposActualizar.hasOwnProperty(restriccion)) {
                    throw new Error("Placeholder") // Hay que crear un error nuevo para esto, despues se hace
                }
            }
            const respuesta = await modelo.update({ ...camposActualizar }, {where: { ...condicion } })
            return respuesta
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}




// Recibe un objeto con las condiciones para eliminar registros
export const factoryModelEliminarCondicionAnd = ({ modelo }) => {
    return async (condiciones: object) => {
        try {
            const respuesta = await modelo.destroy({where: {...condiciones}})
            return respuesta
        } catch (error) {
            console.log(error);
            throw error
        }
    }
}