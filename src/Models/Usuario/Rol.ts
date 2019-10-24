import Sequelize, {Model} from 'sequelize'
import database from '../../Database/database'


class Rol extends Model{}
Rol.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING(30),
        allowNull: false
    }
}, {
    sequelize: database,
    tableName: 'rol'
})



export default Rol