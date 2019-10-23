
export const factoryModelTodos = ({ modelo }) =>  {  // Solo para busquedas de Where x = y and ... and ...
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

export const factoryModelID = ({ modelo }) => {
    return async (id : number) => {
        try {
            const respuesta = await modelo.findOne({ where: { id } })
            return respuesta
        } catch (error) {
            console.log(error)
        }
    } 
}