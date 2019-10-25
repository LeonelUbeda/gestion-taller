import Sequelize, {Model} from 'sequelize'
import database from '../../Database/database'
import Usuario from './Usuario'



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




class RolPermiso extends Model{}

RolPermiso.init({
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


Permiso.belongsToMany(Rol, {
    through: {
        model: RolPermiso
    }
})


Rol.belongsToMany(Permiso, {
    through: {
        model: RolPermiso
    },
    
})


export {RolPermiso, Rol, Permiso}