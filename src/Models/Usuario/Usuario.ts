import Sequelize, {Model} from 'sequelize'
import database from '../../Database/database'

import {Rol} from './RolPermiso'

class Usuario extends Model{}
Usuario.init({

    usuario: {
        type: Sequelize.STRING(30),
        allowNull: false,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    apellido: {
        type: Sequelize.STRING(50)
    },
    contrasena: {
        type: Sequelize.STRING(64),
        allowNull: false
    }
}, {
    sequelize: database,
    tableName: 'usuario'
})

Usuario.belongsTo(Rol, {
    foreignKey:{
        allowNull: false,
        name:'rolId'
    },
    constraints: true
})


export default Usuario