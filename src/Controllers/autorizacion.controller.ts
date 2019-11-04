

import Usuario from '../Models/Usuario/Usuario'
import encriptar from '../utils/encriptar'

import {Rol, Permiso} from '../Models/Usuario/RolPermiso';


// Función para verificar si existe un usuario
// Recibe un nombre de usuario y contraseña. Se encripta la contraseña y se busca en la base de datos
export const usuarioLogin = async (usuario: string, contrasena: string) => {
    const contrasenaHash: string = encriptar(contrasena)
    try {
        const respuesta = await Usuario.findOne({
            where: {
                usuario,
                contrasena: contrasenaHash,
            },
            include: [{
                model: Rol,
                include: [{
                    model: Permiso,
                }]
            }]
        })
        return respuesta
    } catch (error) {
        return error
    }
}
