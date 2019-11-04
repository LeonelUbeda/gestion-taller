import Sequelize, {Model} from 'sequelize'
import database from '../../Database/database'
import Modelo from './Modelo'
// No se puede utilizar el database.define porque typescript no puede crear una clase a partir de esa funcion.
// Mas informacion https://sequelize.org/master/manual/typescript

class Version extends Model{
}
Version.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    modeloId:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nombre: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
}, {
    sequelize: database,
    modelName: 'version'
})

Version.belongsTo(Modelo, {foreignKey: 'modeloId', targetKey: 'id'} )

export default Version;