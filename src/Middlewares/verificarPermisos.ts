
/**
 * @param nombreSeccion 
 * Nombre de la seccion para verificar el permiso
 * @param nivelDeAccesoRequerido 
 * Nivel de acceso requerido para ejecutar la acción
 */

/*  Estructura de res.locals.tokenDecifrado
{ data: 
    {
        usuario: 'Development',
        nombre: 'Development',
        apellido: 'Development',
        contrasena: '79977926027f5a94c1b737b624352f5d19e1c85d77eceb7215eca75e6e8ff3aa',
        rolId: 1,
        Rol: { 
            id: 1, 
            nombre: 'RolNumero1', 
            // TODOS LOS PERMISOS QUE TIENE EL USUARIO
            Permisos: [
                { 
                    id: 1,
                    nombre: 'mecanico',
                    RolPermiso: { 
                        nivelAcceso: 3, 
                        PermisoId: 1, 
                        RolId: 1 
                    } 
                },
                { 
                    id: 2,
                    nombre: 'Manager',
                    RolPermiso: { 
                        nivelAcceso: 4, 
                        PermisoId: 2, 
                        RolId: 1 
                    } 
                }
            ] 
        } 
    },
   iat: 1572375915,
   exp: 1572393915 
}*/

import {Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

// Esta funcion revisa si el usuario tiene los permisos para acceder a la seccion. Si los permisos no son suficientes, se mandará
// el mensaje 'Sin autorizacion'.
// Si el usuario no tienen ningun permiso asignado sobre la sección, osea que permisoEspecifico no existe, entonces de igual forma
// se mandará el mensaje 'Sin autorizacion'
const verificarPermiso = (nombreSeccion: string, nivelDeAccesoRequerido: number) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            // Almacena todos los permisos del objeto tokenDecifrado que me lo pasó el middleware verificarLogin
            const permisoTodos: Array<object> = res.locals.tokenDecifrado.data.Rol.Permisos

            // Busca entre el arreglo de permisos, el permiso que tenga la propiedad nombre y sea igual a nombreSección
            const permisoEspecifico: any = permisoTodos.find((seccion: any) => { 
                return seccion.nombre.toLowerCase() == nombreSeccion.toLowerCase()
            })

            // Busca del objeto permisoEspecifico la propiedad nivelAcceso y la almaceno en nivelDeAcceso
            const nivelDeAccesoUsuario: number = permisoEspecifico.RolPermiso.nivelAcceso

            // Si el nivel de acceso requerido es mayor o igual que el del usuario...
            if(nivelDeAccesoUsuario >= nivelDeAccesoRequerido){
                next()
            }else {
                throw 'Sin autorizacion'
            }
        } catch (error) {
            res.status(403).send('Sin autorizacion')
            
        }
    }
}
export default verificarPermiso