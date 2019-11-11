import Sequelize, {Model} from 'sequelize'
import database from '../../Database/database'
import Usuario from '../Usuario/Usuario'

class Insumo extends Model{
    id: number;
    cantidad: number;
}
Insumo.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    }
}, {
    sequelize: database,
    tableName: 'insumo'
})

class UnidadDeMedida extends Model{}
UnidadDeMedida.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true
    }
}, {
    sequelize: database,
    tableName: 'unidaddemedida'
})

UnidadDeMedida.hasMany(Insumo)

class MovimientoInsumo extends Model{}

MovimientoInsumo.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    }
}, {
    sequelize: database,
    tableName: 'movimientoinsumo'
})


Usuario.hasMany(MovimientoInsumo, {

    foreignKey: 'usuario'
})

Insumo.hasMany(MovimientoInsumo, {
    foreignKey: 'insumoId'
})



export { Insumo, MovimientoInsumo, UnidadDeMedida }
