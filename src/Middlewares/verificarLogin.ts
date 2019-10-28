import {Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'



const verificarLogin = (req: Request, res: Response, next: NextFunction) => { 

    try {
        const token = req.get('Auth')
        var leonel = jwt.verify(token, process.env.SECRET_KEY_JWT)
        console.log(leonel)
        next()
    } catch (error) {
        res.status(403).send('FORBIDDEN')
        

    }
}




export default verificarLogin