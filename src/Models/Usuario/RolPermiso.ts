import Sequelize, {Model} from 'sequelize'
import database from '../../Database/database'
import Rol from './Rol'
import Permiso from './Permiso'

class RolPermiso extends Model{}

RolPermiso.init({
    ID_Rol: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    ID_Permiso: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nivelAcceso: {
        type: Sequelize.TINYINT,
        validate: {
            min: 0,
            max: 4
        }
    }
}, {
    sequelize: database,
    tableName: 'rolpermiso'
})

RolPermiso.belongsTo(Rol,       {foreignKey: 'ID_Rol',        targetKey: 'id'})
RolPermiso.belongsTo(Permiso,   {foreignKey: 'ID_Permiso',    targetKey: 'id'})

export default RolPermiso