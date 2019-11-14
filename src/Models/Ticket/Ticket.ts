import Sequelize, {Model} from 'sequelize'
import database from '../../Database/database'
import Cliente from '../Cliente'
import Vehiculo from '../Vehiculo/Vehiculo'

class Ticket extends Model{}
Ticket.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    vehiculoId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    fechaInicio: {
        type: Sequelize.DATEONLY,
        allowNull: true
    },
    fechaFinal: {
        type: Sequelize.DATEONLY,
    }
}, {
    sequelize: database,
    modelName: 'categoria'
})

Ticket.belongsTo(Cliente, {foreignKey: 'clienteId', targetKey: 'id'})
Ticket.belongsTo(Vehiculo, {foreignKey: 'vehiculoId', targetKey: 'id'})

export default Ticket;