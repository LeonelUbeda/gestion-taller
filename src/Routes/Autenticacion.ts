import {Router, Response, Request} from 'express'
import jwt from 'jsonwebtoken'

import Usuario from '../Models/Usuario/Usuario'
import {usuarioLogin} from '../Controllers/autorizacion.controller'
import encriptar from '../utils/encriptar';
const router = Router();




router.post('/login', async (req: Request, res: Response) => {
    const { usuario, contrasena } = req.body
    const resultado: object = await usuarioLogin(usuario, contrasena )
    var token = jwt.sign({data: resultado}, process.env.SECRET_KEY_JWT, {expiresIn: '5m'});
    res.set('Auth', token).json({resultado, token})
})


router.get('/inicio', (req: Request, res: Response) => {
    try {
        const token = req.get('Auth')
        const resultado = jwt.verify(token, 'shhhhh')
        res.send(resultado)
    } catch (error) {
        res.send('MAL')
    }

})



export default router