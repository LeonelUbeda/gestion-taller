import Sequelize, {Model} from 'sequelize'
import database from '../../Database/database'

import {Rol} from './RolPermiso'

class Usuario extends Model{}
Usuario.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    usuario: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    nombre: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    apellido: {
        type: Sequelize.STRING(50)
    },
    contrasena: {
        type: Sequelize.STRING(64)
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