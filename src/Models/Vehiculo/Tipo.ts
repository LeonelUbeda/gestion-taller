import Sequelize, {Model} from 'sequelize'
import database from '../../Database/database'
// No se puede utilizar el database.define porque typescript no puede crear una clase a partir de esa funcion.
// Mas informacion https://sequelize.org/master/manual/typescript

class Tipo extends Model{
}
Tipo.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
}, {
    sequelize: database,
    modelName: 'tipo'
})



export default Tipo;