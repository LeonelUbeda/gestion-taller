import Sequelize, {Model} from 'sequelize'
import database from '../../Database/database'
import RolPermiso from '../Usuario/RolPermiso'
import Permiso from '../Usuario/Permiso'
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

Rol.hasMany(RolPermiso, {
    foreignKey: 'ID_Permiso',
    sourceKey: 'id'
})




export default Rol