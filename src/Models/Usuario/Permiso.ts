import Sequelize, {Model} from 'sequelize'
import database from '../../Database/database'

// Permiso son las secciones del sistema
class Permiso extends Model{}
Permiso.init({
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
    tableName: 'permiso'
})



export default Permiso