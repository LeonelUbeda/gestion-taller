import Sequelize, {Model} from 'sequelize'
import database from '../Database/database'
import Cliente from './Cliente'

class Telefono extends Model {

}


Telefono.init({

    ID_Cliente: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
        
    },
    telefono: {
        type: Sequelize.INTEGER,
        primaryKey: true
    }
}, {
    sequelize: database,
    modelName: 'telefono'

})


Telefono.belongsTo(Cliente, {foreignKey: 'ID_Cliente' , targetKey:'id'})

export default Telefono;