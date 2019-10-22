
import {Response, Request} from 'express'
import Cliente from '../Models/Cliente'
import tipoCliente from '../Models/Interfaces/Cliente.interface'

// 
const ClienteTodos = async (req: Request, res: Response) => {
    try {

        let {limite,...busqueda } = req.query;

        // Si no existe limite en req.query...
        if (!limite) limite = 10;

        const respuesta : tipoCliente = await Cliente.findAll ({
            where: { ...busqueda }, 
            limit: parseInt(limite)
        });

        res.json(respuesta)

    } catch (error) {

        console.log(error)

    }
}



const ClienteID = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const respuesta = await Cliente.findOne( { where: { id } } )
        res.json(respuesta)
    } catch (error) {
        console.log(error)
    }
} 


const ClienteNuevo = async (req: Request, res: Response) => {
    const { ...infoCliente } = req.body
    try {
        const resultado = await Cliente.create( { ... infoCliente, fechaRegistro: new Date() } )
        res.status(205).json(resultado)
    } catch (error) {
        console.log(error)
    }

}



const ClienteEliminar = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const resultado = await Cliente.destroy({ where: { id } });
        console.log(resultado)
        res.json(resultado)
    } catch (error) {
        console.log(error)
    }

}

export {ClienteTodos, ClienteID, ClienteNuevo, ClienteEliminar}