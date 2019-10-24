import Sequelize, {Model} from 'sequelize'
import database from '../../Database/database'
import Rol from './Rol'
import Permiso from './Permiso'
import Usuario from './Usuario'

class RolPermiso extends Model{}

RolPermiso.init({
    ID_Rol: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        /*references: {
            model: Rol,
            key: 'id'
        }*/
    },
    ID_Permiso: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        /*references: {
            model: Permiso,
            key: 'id'
        }*/
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
//RolPermiso.hasOne(Rol)




export default RolPermiso