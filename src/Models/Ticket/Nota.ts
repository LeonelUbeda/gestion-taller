import Sequelize, {Model} from 'sequelize'
import database from '../../Database/database'
import Ticket from './RespuestoCliente'

class Nota extends Model{}
Nota.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ticketId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nota: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    publico: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize: database,
    modelName: 'categoria'
})

Nota.belongsTo(Ticket, {foreignKey: 'ticketId', targetKey: 'id'})


export default Nota;