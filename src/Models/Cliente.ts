import Sequelize, {Model} from 'sequelize'
import database from '../Database/database'

class Cliente extends Model{

}
Cliente.init({
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING(50)
    },
    apellido: {
        type: Sequelize.STRING(50)
    },
    direccion: {
        type: Sequelize.STRING(100)
    },
    tipoCliente: {
        type: Sequelize.ENUM({
            values:['Persona', 'Empresa']
        })
    }
}, {
    sequelize: database,
    modelName: 'cliente'
})



export default Cliente;