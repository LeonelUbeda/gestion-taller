
import Sequelize from 'sequelize'
const Op = Sequelize.Op
import {Rol, Permiso, RolPermiso} from '../Models/Usuario/RolPermiso'

export const factoryModelTodos = ({ modelo }) =>  {  // Solo para busquedas de Where x = y and ... and ...
    return async ({ limite = '10', offset = '0', ...busqueda }) => {
        try {
            const respuesta = await modelo.findAll({
                where: {...busqueda},
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

// Recibe todos los campos de la tabla. Si no se pasa un campo obligatorio manda un error
export const factoryModelNuevo = ({ modelo }) => {
    return async (elemento: object) => {
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


// Funcion para actualizar tablas con una condición. 
// Se creó porque habian tablas que la llave primaria NO eran números incrementales
// Recibe un objeto {campo: nombre, valor: 'UsuarioJuan'} y un objeto con los campos a actualizar {nombre: 'Ricardo', apellido: 'fulano'}
export const factoryModelActualizarPorPK = ({ modelo }) => {
    return async ({campo, valor}, camposActualizar: object) => {
        try {
            // Esto hace un: 
            // UPDATE modelo SET camposActualizar WHERE campo = valor
            const respuesta = await modelo.update({...camposActualizar }, {where: { [campo]: valor } ,  logging: console.log})
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