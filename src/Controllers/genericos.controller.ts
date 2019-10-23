
export const factoryModelTodos = ({ modelo }) =>  {
    return async ({ limite = '10', ...busqueda }, ) => {
        try {
            // Si no existe limite en req.query...

            const respuesta = await modelo.findAll({
                where: {
                    ...busqueda,
                },
                limit: parseInt(limite)
            });

            return respuesta

        } catch (error) {

            console.log(error)

        }
    }
}

export const factoryModelID = ({ modelo }) => {
    return async (id) => {
        try {
            const respuesta = await modelo.findOne({ where: { id } })
            return respuesta
        } catch (error) {
            console.log(error)
        }
    } 
}