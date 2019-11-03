import Sequelize, {Model} from 'sequelize'
import database from '../../Database/database'
import Marca from './Marca'
// No se puede utilizar el database.define porque typescript no puede crear una clase a partir de esa funcion.
// Mas informacion https://sequelize.org/master/manual/typescript

class Modelo extends Model{
}
Modelo.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    marcaId:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nombre: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
}, {
    sequelize: database,
    modelName: 'modelo'
})

Modelo.belongsTo(Marca, {foreignKey: 'marcaId', targetKey: 'id'} )

export default Modelo;