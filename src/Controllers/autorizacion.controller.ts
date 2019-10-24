import Usuario from '../Models/Usuario/Usuario'
import encriptar from '../utils/encriptar'
import Rol from '../Models/Usuario/Rol'
import RolPermiso from '../Models/Usuario/RolPermiso';
import Permiso from '../Models/Usuario/Permiso';

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
                    model: RolPermiso,
                    where:{
                        ID_Rol: 1
                    }
                }]
            }]
        })
        
        const prueba = await RolPermiso.findAll({
            where: {
                ID_Rol: 1
            }
    
        })
        console.log(JSON.stringify("PRUEBAAAAAAAAAA",prueba))
        
        return respuesta
    } catch (error) {
        return error
    }
}

export const factoryLoginUser = ({ modelo }) =>  {  // Solo para busquedas de Where x = y and ... and ...
    return async ({ limite = '10', offset = '0', ...busqueda }, ) => {
        try {
            // Si no existe limite en req.query...
            const respuesta = await modelo.findAll({
                where: {
                    ...busqueda,
                },
                limit: parseInt(limite),
                offset: parseInt(offset)
            });

            return respuesta

        } catch (error) {

            console.log(error)

        }
    }
}