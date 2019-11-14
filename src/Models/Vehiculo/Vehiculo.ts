import Sequelize, {Model} from 'sequelize'
import database from '../../Database/database'
import Cliente from '../Cliente'
import Tipo from './Tipo'
import Modelo from './Modelo'
import Version from './Version'


class Vehiculo extends Model{}

Vehiculo.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    modeloId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    versionId: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    clienteId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    tipoId: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    matricula: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true
    }
}, {
    sequelize: database,
    modelName: 'auto'
})

Vehiculo.belongsTo(Cliente, {foreignKey: 'clienteId',   targetKey: 'id'})
Vehiculo.belongsTo(Tipo,    {foreignKey: 'tipoId',      targetKey: 'id'})
Vehiculo.belongsTo(Modelo,  {foreignKey: 'modeloId',    targetKey: 'id'})
Vehiculo.belongsTo(Version, {foreignKey: 'versionId',   targetKey: 'id'})


export default Vehiculo