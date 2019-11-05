import { SequelizeMock } from '../SequelizeMock'

test('Sequelize Mocker se inserta un dataset',
    () => {
        const sequelizeMock = new SequelizeMock()
        const dataset = {
            'tabla' : [{id: 1 },{id:2}]
        }
        expect(sequelizeMock.insertDataset(dataset)).toStrictEqual(dataset)
        expect(sequelizeMock._dataset).toStrictEqual(dataset)
        expect(typeof sequelizeMock._dataset).toBe('object')
    })

test('Sequelize Mocker no acepta un dataset que no sea array',
    () => {
        const sequelizeMock = new SequelizeMock()
        const dataset = [{ id:1},{id:2}]
        expect(() =>{ sequelizeMock.insertDataset(dataset)}).toThrowError('Dataset debe ser un objeto')
        expect(typeof sequelizeMock._dataset).toBe('object')
        expect(sequelizeMock._dataset).toStrictEqual({})
    })

test('La tabla de Sequelize Mocker debe ser un array',
    () => {
        const sequelizeMock = new SequelizeMock()
        const dataset = {
            'tabla': [{ id: 1 }, { id: 2 }],
            'tabla2': { id: 1 }
        }
        expect(() => { sequelizeMock.insertDataset(dataset) }).toThrowError('Las tablas deben ser un array')
    })



test('Sequelize Mocker devuelve la tabla solicitada',
    () => {
        const sequelizeMock = new SequelizeMock()
        const dataset = {
            'tabla': [{ id: 1 }, { id: 2 }]
        }
        sequelizeMock.insertDataset(dataset)
        const tabla = sequelizeMock.getTable('tabla')
        expect(tabla).toStrictEqual(dataset.tabla)
    })

test('Sequelize Mocker tira error si la tabla no existe',
    () => {
        const sequelizeMock = new SequelizeMock()
        const dataset = {
            'tabla': [{ id: 1 }, { id: 2 }]
        }
        sequelizeMock.insertDataset(dataset)
        expect(() => {
            sequelizeMock.getTable('memotecnia')
        }).toThrow('La tabla no existe en el dataset')
    })

test('Clear Dataset limpia el data set',
    () => {
        const sequelizeMock = new SequelizeMock()
        const dataset = {
            'tabla': [{ id: 1 }, { id: 2 }],
            'tabla2': [{ id: 1 }]
        }
        sequelizeMock.insertDataset(dataset)
        expect(sequelizeMock.clearDataset()).toStrictEqual({})
    })