import { MockModel } from '../MockModel'
import { Op } from '../Operadores'
import { SequelizeMock } from '../SequelizeMock'
import {dataset} from './dataset'
const db = new SequelizeMock()
class UserModel extends MockModel { }
class Rol extends MockModel { }
class Permiso extends MockModel { }
class RolPermiso extends MockModel { }
beforeAll(() => {
    db.insertDataset(dataset)
    const modelo = {
        id: {
            type: SequelizeMock.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: SequelizeMock.STRING(50),
            allowNull: false
        },
        apellido: {
            type: SequelizeMock.STRING(50)
        },
        direccion: {
            type: SequelizeMock.STRING(100)
        },
        tipoCliente: {
            type: SequelizeMock.ENUM({
                values: ['Persona', 'Empresa']
            })
        },
        fechaRegistro: {
            allowNull: false
        }
    }
    UserModel.init(modelo, {
        sequelize: db,
        tableName: 'cliente'
    })

    Permiso.init({
        id: {
            type: SequelizeMock.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: SequelizeMock.STRING(30),
            allowNull: false,
            unique: true
        }
    }, {
        sequelize: db,
        tableName: 'permiso'
    })
    Rol.init({
        id: {
            type: SequelizeMock.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: SequelizeMock.STRING(30),
            allowNull: false
        }
    }, {
        sequelize: db,
        tableName: 'rol'
    })
    RolPermiso.init({
        nivelAcceso: {
            type: SequelizeMock.TINYINT,
            validate: {
                min: 0,
                max: 4
            }
        }
    }, {
        sequelize: db,
        tableName: 'rolpermiso'
    })
})

test('Mock Model init Crea el modelado del Modelo define el nombre de tabla, pk ', () => {
    
    class UserModel extends MockModel { }
    const modelo = {
        id: {
            type: SequelizeMock.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: SequelizeMock.STRING(50),
            allowNull: false
        },
        apellido: {
            type: SequelizeMock.STRING(50)
        },
        direccion: {
            type: SequelizeMock.STRING(100)
        },
        tipoCliente: {
            type: SequelizeMock.ENUM({
                values: ['Persona', 'Empresa']
            })
        },
        fechaRegistro: {
            allowNull: false
        }
    }
    UserModel.init(modelo, {
        sequelize: db,
        tableName: 'cliente'
    })
    expect(UserModel._modelo).toStrictEqual(modelo)
    expect(UserModel._nombreTabla).toBe('cliente')
    expect(UserModel._pk).toBe('id')
    expect(UserModel._sequelize).toStrictEqual(db)
    
})



test('Mock Model los atributos deben de set un array', () => {
 
    const result = UserModel.findAll({
        attributes: ['id', 'tipoCliente']
    })
    expect(result).toStrictEqual([
        {
            id: 1,
            tipoCliente: 'Persona',
        },
        {
            id: 2,
            tipoCliente: 'Empresa',
        },
        {
            id: 3,
            tipoCliente: 'Persona',
        },
    ])
    expect(result.length).toBe(3)
})

test('Mock Model seleccionar un elemento del MockData', () => {
    const result = UserModel.findOne()
    expect(Array.isArray(result)).toBeTruthy()
    expect(result).toStrictEqual([{
        id: 1,
        nombre: 'Roberto',
        apellido: 'Sanchez',
        direccion: 'Dirreccion 1',
        tipoCliente: 'Persona',
        fechaRegistro: '2019-10-11',
    }])
    expect(result.length).toBe(1)
})


test('Mock Model seleccionar todos los  elemento del MockData', () => {


    expect(UserModel.findAll().length).toBe(3)
})


test('Mock Model puede limitar la cantidad de resultados', () => {
    const result = UserModel.findAll({ limit: 2 })
    expect(result.length).toBe(2)
    expect(result).toStrictEqual(dataset.cliente.slice(0,2))
})
test('Mock Model el limite debe ser un numero', () => {
    expect(()=> {UserModel.findAll({ limit: '2' })}).toThrowError()
   
})

test('Mock Model puede hacer un offset de los resultados resultados', () => {
    const offset = 1
    const result = UserModel.findAll({ offset})
    expect(result.length).toBe(dataset.cliente.length - offset )
    expect(result).toStrictEqual(dataset.cliente.slice(offset))
})

test('Mock Model puede filtrar resultados', () => { 
    const result = UserModel.findAll({ where: { id : 2}})
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([dataset.cliente[1]])
})

test('Mock Model puede filtrar con un and logico resultados y ningun match', () => {
    const result = UserModel.findAll({ where: { id: 2  , userId: 5}  })
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
})

test('Mock Model puede filtrar con un and logico', () => {
   
    const result = UserModel.findAll({ where: { id: 3, tipoCliente: 'Persona' } })
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([ dataset.cliente[2]])
})

test('Mock Model puede filtrar con un or logico matches', () => {
  
    const result = UserModel.findAll({
        where: {
            [Op.or]: [
                {id: 1},
                {tipoCliente: 'Persona' }
            ]
        }
    })
    expect(result.length).toBe(2)
    expect(result).toStrictEqual([dataset.cliente[0], dataset.cliente[2]])
})


test('Mock Model puede filtrar con operador greater logico matches', () => {
  
    const result = UserModel.findAll({
        where: {
            id: {
                [Op.gt] : 1
         }
        }
    })
    expect(result.length).toBe(2)
    expect(result).toStrictEqual(dataset.cliente.slice(1))
})    


test('Mock Model asociacion belongTo', () => {
    Rol.belongsToMany(Permiso, {
        through: {
            model: RolPermiso
        }
  })
 
    expect(Rol._belongsToMany).toStrictEqual({
        'Permiso': {
            modelo: Permiso,
            through: {
                model: RolPermiso
            } 
        }
    })
    expect(Rol._modelo['permisoId']).toStrictEqual(
        {
            type: SequelizeMock.INTEGER
        }
    )
    expect(Permiso._hasMany).toStrictEqual([{ modelo: Rol , as: 'rol'}])
    expect(Permiso._modelo)
    const llavesPermiso = Object.keys(Permiso)
    expect(['addRol','removeRol','getRol'].every((valor)=> llavesPermiso.includes(valor)))

})    