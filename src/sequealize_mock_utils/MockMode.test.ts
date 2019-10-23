import { MockModel } from './MockModel'

test('Mock Model insertar Mock Data en forma de array', () => {
    const mockModel: MockModel<any> = new MockModel<any>();
    mockModel.addResults([{ id: 1 }, { id: 2 }, { id: 3 }]);
    expect(mockModel.getResult().length).toBe(3)
})
test('Mock Model insertar Mock Data como varios argumentos', () => {
    const mockModel: MockModel<any> = new MockModel<any>();
    mockModel.addResults({ id: 1 }, { id: 2 }, { id: 3 });
    expect(mockModel.getResult().length).toBe(3)
})

test('Mock Model seleccionar un elemento del MockData', () => {
    const mockModel: MockModel<any> = new MockModel<any>();
    mockModel.addResults({ id: 1 }, { id: 2 }, { id: 3 });

    expect(mockModel.findOne().length).toBe(1)
})


test('Mock Model seleccionar todos los  elemento del MockData', () => {
    const mockModel: MockModel<any> = new MockModel<any>();
    mockModel.addResults({ id: 1 }, { id: 2 }, { id: 3 });

    expect(mockModel.findAll().length).toBe(3)
})

