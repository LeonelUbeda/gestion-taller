import { MockModel } from '../MockModel'
import { Op } from '../Operadores'
import { SequelizeMock } from '../SequelizeMock'
const db = new SequelizeMock()
beforeAll(() => {
    db.insertDataset({
        'cliente': [
            {
                id: 1,
                nombre: 'Roberto',
                apellido: 'Sanchez',
                direccion: 'Dirreccion 1',
                tipoCliente: 'Persona',
                fechaRegistro: '2019-10-11',
            },
            {
                id: 2,
                nombre: 'Leonel',
                apellido: 'Ubeda',
                direccion: 'Dirreccion 2',
                tipoCliente: 'Empresa',
                fechaRegistro: '2019-10-11',
            },
            {
                id: 3,
                nombre: 'Carlos',
                apellido: 'Dinarte',
                direccion: 'Dirreccion 3',
                tipoCliente: 'Persona',
                fechaRegistro: '2019-10-11',
            },
        ],
        })
})
test('Mock Model los atributos deben de set un array de strings ', () => {
    
    class UserModel extends MockModel { }
    UserModel.init({
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
    }, {
        SequelizeMock: db,
        modelName: 'cliente'
    })
    expect()
    
})

/* 
    const mockModel: MockModel<any> = new MockModel<any>();
   */

test('Mock Model los atributos deben de set un array', () => {
   class UserModel extends MockModel { }

    expect( UserModel.findAll({
        attributes: ['id','comida']
    })).toStrictEqual('')
    expect(UserModel.findAll({
        attributes: ['id', 'comida']
    }).length).toBe(1)
})


test('Mock Model seleccionar un elemento del MockData', () => {
    class UserModel extends MockModel { }

    const result = UserModel.findOne()
    expect(Array.isArray(result)).toBeTruthy()
    expect(result).toStrictEqual([])
    expect(result.length).toBe(1)
})


test('Mock Model seleccionar todos los  elemento del MockData', () => {
    class UserModel extends MockModel{}


    expect(UserModel.findAll().length).toBe(3)
})

test('Mock Model puede limitar la cantidad de resultados', () => {
    class UserModel extends MockModel { }
    const result = UserModel.findAll({ limit: 2 })
    expect(result.length).toBe(2)
    expect(result).toStrictEqual([
        { id: 1 }, { id: 2 }
    ])
})

test('Mock Model puede hacer un offset de los resultados resultados', () => {
    class UserModel extends MockModel { }
  
    const result = UserModel.findAll({ offset: 3 })
    expect(result.length).toBe(5)
    expect(result).toStrictEqual(data.slice(3))
})

test('Mock Model puede filtrar resultados', () => {
    class UserModel extends MockModel { }
 
    const result = UserModel.findAll({ where: { id : 2}})
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([data[1]])
})

test('Mock Model puede filtrar con un and logico resultados y ningun match', () => {
    class UserModel extends MockModel { }
    const result = UserModel.findAll({ where: { id: 2  , userId: 5}  })
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
})

test('Mock Model puede filtrar con un and logico y varios matches', () => {
   
    const result = mockModel.findAll({ where: { comida: 2 ,  userId: 5 } })
    expect(result.length).toBe(2)
    expect(result).toStrictEqual([data[0],data[4]])
})

test('Mock Model puede filtrar con un or logico matches', () => {
  
    const result = mockModel.findAll({
        where: {
            [Op.or]: [
                {userId: 5},
                {comida: 2}
            ]
        }
    })
    expect(result.length).toBe(5)
    expect(result).toStrictEqual(resultadoDeseado)
})


test('Mock Model puede filtrar con operador greater logico matches', () => {
  
    const result = mockModel.findAll({
        where: {
            comida: {
                [Op.gt] : 5
         }
        }
    })
    console.log(result)
    expect(result.length).toBe(3)
    console.log([data[2], data[3], data[7]])
    expect(result).toStrictEqual([data[1], data[2], data[7]])
})