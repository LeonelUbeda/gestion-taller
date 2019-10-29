import {Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'







const verificarLogin = (req: Request, res: Response, next: NextFunction) => { 
    try {
        const token = req.get('Auth')
        const tokenDecifrado: any  = jwt.verify(token, process.env.SECRET_KEY_JWT)
        res.locals.tokenDecifrado = tokenDecifrado
        next()
    } catch (error) {
        res.status(401).send('NO AUTORIZADO')
    }
}

export default verificarLogin