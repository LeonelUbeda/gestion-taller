import {factoryModelTodos} from './cliente.controller'
import { MockModel } from '../sequealize_mock_utils/MockModel'
import Cliente from '../Models/Interfaces/Cliente.interface'

const dataSetCliente = [
    {
    id: 1,
    nombre: 'Leonel',
    apellido: 'Sanchez',
    direccion: 'Una Dirreccion',
    tipoCliente: 'Persona',
    fechaRegistro: '2019-08-10'
    },
    {
        id: 2,
        nombre: 'Carlos',
        apellido: 'Dinarte',
        direccion: 'Direccion 2',
        tipoCliente: 'Empresa',
        fechaRegistro: '2019-08-10'
    },
    {
        id: 3,
        nombre: 'Roberto',
        apellido: 'Sanchez',
        direccion: 'Direccion 3',
        tipoCliente: 'Persona',
        fechaRegistro: '2019-08-10'
    },
    {
        id: 4,
        nombre: 'Leonel',
        apellido: 'Sanchez',
        direccion: 'Una Dirreccion',
        tipoCliente: 'Persona',
        fechaRegistro: '2019-08-10'
    },
    {
        id: 5,
        nombre: 'Carlos',
        apellido: 'Dinarte',
        direccion: 'Direccion 2',
        tipoCliente: 'Empresa',
        fechaRegistro: '2019-08-10'
    },
    {
        id: 6,
        nombre: 'Roberto',
        apellido: 'Sanchez',
        direccion: 'Direccion 3',
        tipoCliente: 'Persona',
        fechaRegistro: '2019-08-10'
    },
    {
        id: 7,
        nombre: 'Leonel',
        apellido: 'Sanchez',
        direccion: 'Una Dirreccion',
        tipoCliente: 'Persona',
        fechaRegistro: '2019-08-10'
    },
    {
        id: 8,
        nombre: 'Carlos',
        apellido: 'Dinarte',
        direccion: 'Direccion 2',
        tipoCliente: 'Empresa',
        fechaRegistro: '2019-08-10'
    },
    {
        id: 9,
        nombre: 'Roberto',
        apellido: 'Sanchez',
        direccion: 'Direccion 3',
        tipoCliente: 'Persona',
        fechaRegistro: '2019-08-10'
    },
    {
        id: 10,
        nombre: 'Leonel',
        apellido: 'Sanchez',
        direccion: 'Una Dirreccion',
        tipoCliente: 'Persona',
        fechaRegistro: '2019-08-10'
    },
    {
        id: 20,
        nombre: 'Carlos',
        apellido: 'Dinarte',
        direccion: 'Direccion 2',
        tipoCliente: 'Empresa',
        fechaRegistro: '2019-08-10'
    },
    {
        id: 35,
        nombre: 'Roberto',
        apellido: 'Sanchez',
        direccion: 'Direccion 3',
        tipoCliente: 'Persona',
        fechaRegistro: '2019-08-10'
    }
]

test('factoryModelTodos devuelve una funcion', async () =>
{
    const model: MockModel<Cliente> = new MockModel<Cliente>()
    model.addResults({
        id: 1,
        nombre: 'Roberto',
        apellido: 'Sanchez',
        direccion: 'Una Dirreccion',
        tipoCliente: 'Persona',
        fechaRegistro: '2019-08-10'
    }, {
        id: 2,
        nombre: 'Roberto',
        apellido: 'Sanchez',
        direccion: 'Una Dirreccion',
        tipoCliente: 'Persona',
        fechaRegistro: '2019-08-10'
    })
    const clienteTodos = factoryModelTodos({ modelo: model })
    const result = await clienteTodos({})
    expect(result.length).toBe(2)

})


test('Where en una req.query', async () => {
    const model: MockModel<Cliente> = new MockModel<Cliente>()
    model.addResults(dataSetCliente)
    const clienteTodos = factoryModelTodos({ modelo: model })
    const query = {
        nombre: 'Roberto'
    }
    const arrayResultadoQuery = dataSetCliente.filter( el => el.nombre === query.nombre)
    const result = await clienteTodos(query)
    expect(result.length).toBe(arrayResultadoQuery.length)
    expect(result).toStrictEqual(arrayResultadoQuery)

})
