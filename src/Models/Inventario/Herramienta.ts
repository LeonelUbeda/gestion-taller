import Sequelize, {Model} from 'sequelize'
import database from '../../Database/database'
import Usuario from '../Usuario/Usuario'



class Herramienta extends Model{
    id: number;
    cantidad: number;
}
Herramienta.init({
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
    tableName: 'herramienta'
})


class Categoria extends Model{}
Categoria.init({
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
    tableName: 'categoriah'
})

Categoria.hasMany(Herramienta, {
    foreignKey: "categoriaId"
})

class MovimientoHerramienta extends Model{}

MovimientoHerramienta.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo: {
        type: Sequelize.ENUM('entrada', 'salida'),
        allowNull: false
    },
    cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    fecha: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    razon: {
        type: Sequelize.STRING(144), // no se si deberia de tener esta length
        // allowNull: false, // no se esto   
    }
}, {
    sequelize: database,
    tableName: 'movimientoherramienta'
})

Herramienta.hasMany(MovimientoHerramienta, {
    foreignKey: 'herramientaId'
})

Usuario.hasMany(MovimientoHerramienta, {
    foreignKey: 'usuario'
})

export {Categoria, Herramienta, MovimientoHerramienta}