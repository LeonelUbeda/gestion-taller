import { MockModel } from './MockModel'
import { Op } from './Operadores'

test('Mock Model los atributos deben de set un array de strings ', () => {
    const mockModel: MockModel<any> = new MockModel<any>();
    const data = [{ id: 1 }, { id: 2 }, { id: 3 }]
    mockModel.addResults(data);
   
    expect(() => mockModel.findAll({
        attributes: {}
    })).toThrowError('Los atributos tienen que ser un array de strings')
})

/* 
    const mockModel: MockModel<any> = new MockModel<any>();
   */

test('Mock Model los atributos deben de set un array', () => {
    const mockModel: MockModel<any> = new MockModel<any>();
    const data = [
        { id: 1, userId: 5, comida: 2 }, // userId
        { id: 2, userId: 6, comida: 6 },
        { id: 3, userId: 7, comida: 7 },
        { id: 4, userId: 10, comida: 2 }, //comida
        { id: 5, userId: 5, comida: 2 },//userId
        { id: 6, userId: 2, comida: 5 },
        { id: 7, userId: 6, comida: 2 },//comida
        { id: 8, userId: 5, comida: 10 }//userId
    ]
    const result = [
        { id: 1,comida: 2 }, // userId
        { id: 2,comida: 6 },
        { id: 3,comida: 7 },
        { id: 4, comida: 2 }, //comida
        { id: 5,comida: 2 },//userId
        { id: 6,comida: 5 },
        { id: 7,comida: 2 },//comida
        { id: 8,comida: 10 }//userId
    ] 
    mockModel.addResults(data);

    expect( mockModel.findAll({
        attributes: ['id','comida']
    })).toStrictEqual(result)
    expect(mockModel.findAll({
        attributes: ['id', 'comida']
    }).length).toBe(data.length)
})

test('Mock Model insertar Mock Data en forma de array', () => {
    const mockModel: MockModel<any> = new MockModel<any>();
    const data = [{ id: 1 }, { id: 2 }, { id: 3 }]
    mockModel.addResults(data);
    const result = mockModel.getResult()
    expect(result).toStrictEqual(data)
    expect(result.length).toBe(3)
})

test('Mock Model seleccionar un elemento del MockData', () => {
    const mockModel: MockModel<any> = new MockModel<any>();
    const data = [{ id: 1 }, { id: 2 }, { id: 3 }]
        mockModel.addResults(data);

    const result = mockModel.findOne()
    expect(Array.isArray(result)).toBeTruthy()
    expect(result).toStrictEqual([data[0]])
    expect(result.length).toBe(1)
})


test('Mock Model seleccionar todos los  elemento del MockData', () => {
    const mockModel: MockModel<any> = new MockModel<any>();
    mockModel.addResults({ id: 1 }, { id: 2 }, { id: 3 });

    expect(mockModel.findAll().length).toBe(3)
})

test('Mock Model puede limitar la cantidad de resultados', () => {
    const mockModel: MockModel<any> = new MockModel<any>();
    mockModel.addResults({ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 });
    const result = mockModel.findAll({ limit: 2 })
    expect(result.length).toBe(2)
    expect(result).toStrictEqual([
        { id: 1 }, { id: 2 }
    ])
})

test('Mock Model puede hacer un offset de los resultados resultados', () => {
    const mockModel: MockModel<any> = new MockModel<any>();
    const data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }]
    mockModel.addResults(data);
    const result = mockModel.findAll({ offset: 3 })
    expect(result.length).toBe(5)
    expect(result).toStrictEqual(data.slice(3))
})

test('Mock Model puede filtrar resultados', () => {
    const mockModel: MockModel<any> = new MockModel<any>();
    const data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }]
    mockModel.addResults(data);
    const result = mockModel.findAll({ where: { id : 2}})
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([data[1]])
})

test('Mock Model puede filtrar con un and logico resultados y ningun match', () => {
    const mockModel: MockModel<any> = new MockModel<any>();
    const data = [
        { id: 1, userId: 5 },
        { id: 2, userId: 6 },
        { id: 3, userId: 7 },
        { id: 4, userId: 10 },
        { id: 5, userId: 5 },
        { id: 6, userId: 2 },
        { id: 7, userId: 6 },
        { id: 8, userId: 5 }
    ]
    mockModel.addResults(data);
    const result = mockModel.findAll({ where: { id: 2  , userId: 5}  })
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
})

test('Mock Model puede filtrar con un and logico y varios matches', () => {
    const mockModel: MockModel<any> = new MockModel<any>();
    const data = [
        { id: 1, userId: 5  , comida: 2}, // este
        { id: 2, userId: 6  , comida: 6},
        { id: 3, userId: 7  , comida: 7},
        { id: 4, userId: 10, comida: 2 },
        { id: 5, userId: 5  , comida: 2},//este
        { id: 6, userId: 2  , comida: 5},
        { id: 7, userId: 6  , comida: 2},
        { id: 8, userId: 5  , comida: 10}
    ]
    mockModel.addResults(data);
    const result = mockModel.findAll({ where: { comida: 2 ,  userId: 5 } })
    expect(result.length).toBe(2)
    expect(result).toStrictEqual([data[0],data[4]])
})

test('Mock Model puede filtrar con un or logico matches', () => {
    const mockModel: MockModel<any> = new MockModel<any>();
    const data = [
        { id: 1, userId: 5, comida: 2 }, // userId
        { id: 2, userId: 6, comida: 6 },
        { id: 3, userId: 7, comida: 7 },
        { id: 4, userId: 10, comida: 2 }, //comida
        { id: 5, userId: 5, comida: 2 },//userId
        { id: 6, userId: 2, comida: 5 },
        { id: 7, userId: 6, comida: 2 },//comida
        { id: 8, userId: 5, comida: 10 }//userId
    ]
    const resultadoDeseado = [
        { id: 1, userId: 5, comida: 2 }, // userId
        { id: 4, userId: 10, comida: 2 }, //comida
        { id: 5, userId: 5, comida: 2 },//userId
        { id: 7, userId: 6, comida: 2 },//comida
        { id: 8, userId: 5, comida: 10 }//userId
    ]
    mockModel.addResults(data);
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
    const mockModel: MockModel<any> = new MockModel<any>();
    const data = [
        { id: 1, userId: 5, comida: 2 ,}, //
        { id: 2, userId: 6, comida: 6 },//este
        { id: 3, userId: 7, comida: 7 },//este
        { id: 4, userId: 10, comida: 2 }, //
        { id: 5, userId: 5, comida: 2 },//
        { id: 6, userId: 2, comida: 5 },
        { id: 7, userId: 6, comida: 2 },//
        { id: 8, userId: 5, comida: 10 }//este
    ]
    mockModel.addResults(data);
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