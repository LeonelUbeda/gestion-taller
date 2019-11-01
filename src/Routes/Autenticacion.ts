import {Router, Response, Request} from 'express'
import jwt from 'jsonwebtoken'
const router = Router();


// -------------------- Controladores -------------------- 
import {usuarioLogin} from '../Controllers/autorizacion.controller'




// -------------------- Rutas de autenticación -------------------- 

router.post('/login', async (req: Request, res: Response) => {
    const { usuario, contrasena } = req.body
    try {
        const resultado: any = await usuarioLogin(usuario, contrasena)
        const resultadoLimpio = JSON.parse(JSON.stringify(resultado[0]))
        if(resultado[0].usuario){
            var token = jwt.sign( {data: resultadoLimpio } , process.env.SECRET_KEY_JWT, { expiresIn: process.env.JWT_EXPIRES_IN });

            res.set('Auth', token).json({token})
        }else {

        }
    } catch (error) {
        console.log(error)
        res.send('NEL')
    }
})

router.get('/inicio', (req: Request, res: Response) => {
    try {
        const token = req.get('Auth')
        const resultado = jwt.verify(token, process.env.SECRET_KEY_JWT )

        res.send(resultado)
    } catch (error) {
        res.send('MAL')
    }

})



export default router