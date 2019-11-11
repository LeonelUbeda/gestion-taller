import Sequelize, {Model} from 'sequelize'
import database from '../../Database/database'
import { Herramienta } from './Herramienta'
import { Insumo } from './Insumo'

class HerramientaInsumo extends Model{}
HerramientaInsumo.init({}, {
    sequelize: database,
    tableName: 'herramientainsumo'
})

Herramienta.belongsToMany(Insumo, {
    through: HerramientaInsumo,
    foreignKey: 'herramientaId'
})

Insumo.belongsToMany(Herramienta, {
    through: HerramientaInsumo,
    foreignKey: 'insumoId'
})