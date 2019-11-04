import Sequelize, {Model} from 'sequelize'
import database from '../../Database/database'
import Categoria from './Categoria'

// No se puede utilizar el database.define porque typescript no puede crear una clase a partir de esa funcion.
// Mas informacion https://sequelize.org/master/manual/typescript

class Servicios extends Model{
}
Servicios.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categoriaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nombre: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    descripcion: {
        type: Sequelize.STRING(200)
    }
}, {
    sequelize: database,
    modelName: 'servicios'
})

Servicios.belongsTo(Categoria, {foreignKey: 'categoriaId', targetKey: 'id'})


export default Servicios;