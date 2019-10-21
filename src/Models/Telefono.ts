import Sequelize, {Model} from 'sequelize'
import database from '../Database/database'
import Cliente from './Cliente'

class Telefono extends Model {}




Telefono.init({
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ID_Cliente: {
        type: Sequelize.INTEGER,
        allowNull: false
        
    },
    numero: {
        type: Sequelize.INTEGER
    }
}, {
    sequelize: database,
    modelName: 'telefono'

})
// No se puede utilizar el database.define porque typescript no puede crear una clase a partir de esa funcion.
// Mas informacion https://sequelize.org/master/manual/typescript

Telefono.belongsTo(Cliente, {foreignKey: 'ID_Cliente' , targetKey:'ID'})

export default Telefono;