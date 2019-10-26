
import Sequelize from 'sequelize'
const Op = Sequelize.Op


export const factoryModelTodos = ({ modelo }) =>  {  // Solo para busquedas de Where x = y and ... and ...
    return async ({ limite = '10', offset = '0', ...busqueda }, ) => {
        try {
            // Si no existe limite en req.query...
            const respuesta = await modelo.findAll({
                where: [
                    ...busqueda,
                ],
                limit: parseInt(limite),
                offset: parseInt(offset)
            });
            return respuesta
        } catch (error) {
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
            throw error
        }
    } 
}
export const factoryModelNuevo = ({ modelo }) => {
    return async (elemento) => {
        try {
            const respuesta = await modelo.create({ ...elemento })
            return respuesta
        } catch (error) {
            let errorFormateado = error.errors.map(a => a.message);
            console.log(errorFormateado)
            throw error
        }
    }
}

// Recibe un id y los campos a actualizar con sus respectivos valores
export const factoryModelActualizarId = ({ modelo }) => {
    return async ({id,...camposActualizar}) => {
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