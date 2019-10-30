import Usuario from '../Models/Usuario/Usuario'
import encriptar from '../utils/encriptar'


import {Rol, RolPermiso, Permiso} from '../Models/Usuario/RolPermiso';

export const usuarioLogin = async (usuario: string, contrasena: string) => {
    const contrasenaHash: string = encriptar(contrasena)
    try {
        const respuesta = await Usuario.findAll({
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
      
        /*const prueba = await RolPermiso.findAll({
            where: {
                
            },
            include: [{model: Rol}, {model: Permiso}]
        })
        
        */
        return respuesta
        //return prueba
    } catch (error) {
        return error
    }
}



//export const 