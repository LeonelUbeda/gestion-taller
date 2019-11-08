import Sequelize, {Model} from 'sequelize'
import database from '../Database/database'
import Cliente from './Cliente'

class Telefono extends Model {

}


Telefono.init({
    clienteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
        
    },
    telefono: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    }
}, {
    sequelize: database,
    modelName: 'telefono'

})


Telefono.belongsTo(Cliente, {foreignKey: 'clienteId' , targetKey:'id'})

export default Telefono;