
export const factoryModelTodos = ({ modelo,  include = [] }) =>  {  // Solo para busquedas de Where x = y and ... and ...
    return async ({ limite = '10', offset = '0', ...busqueda }) => {
        try {
            const respuesta = await modelo.findAll({
                where: {...busqueda},
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

export const factoryModelID = ({ modelo }) => {
    return async (id : number) => {
        try {
            const respuesta = await modelo.findOne({ where: { id } })
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