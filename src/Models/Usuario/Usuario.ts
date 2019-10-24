import Sequelize, {Model} from 'sequelize'
import database from '../../Database/database'
import Rol from './Rol'

class Usuario extends Model{}
Usuario.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ID_Rol: {
        type: Sequelize.INTEGER,
        allowNull: false

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
    }
}, {
    sequelize: database,
    tableName: 'usuario'
})

Usuario.belongsTo(Rol, {foreignKey: 'ID_Rol', targetKey: 'id'})


export default Usuario