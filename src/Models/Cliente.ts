import Sequelize, {Model} from 'sequelize'
import database from '../Database/database'

class Cliente extends Model{}

Cliente.init({
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario: {
        type: Sequelize.STRING(30)
    },
    nombre: {
        type: Sequelize.STRING(30)
    },
    apellido: {
        type: Sequelize.STRING(30)
    },
    contrasena: {
        type: Sequelize.STRING(50)
    }
}, {
    sequelize: database,
    modelName: 'cliente'
})



export default Cliente;