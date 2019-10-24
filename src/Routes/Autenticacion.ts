import {Router, Response, Request} from 'express'
import jwt from 'jsonwebtoken'

import Usuario from '../Models/Usuario/Usuario'
import {usuarioLogin} from '../Controllers/autorizacion.controller'
const router = Router();




router.post('/login', async (req: Request, res: Response) => {
    //const { usuario, contrasena } = req.body
    
    const usuario = 'Leonel'
    const contrasena = 'leonel'
    
    const resultado = await usuarioLogin(usuario, contrasena)
    
    //var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
    //console.log(token)
    res.json(resultado)
})






export default router