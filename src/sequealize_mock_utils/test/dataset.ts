export const dataset = {
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
    'rol': [
        {
            id: 1,
            nombre: 'Admin'
        },
        {
            id: 2,
            nombre: 'Gerente'
        },
        {
            id: 3,
            nombre: 'Mecanico'
        }
    ],
    'permiso': [
        {
        id: 1, 
        nombre : 'clientes'
        },
        {
            id: 1,
            nombre: 'usuarios'
        },
        {
            id: 3,
            nombre: 'insumos'
        }
    ]
    ,
    'rolpermiso': [
        {
            id: 1,
            nivelAcceso: 3,
            permisoId: 1,
            rolId: 1
        },
        {
            id: 2,
            nivelAcceso: 3,
            permisoId: 2,
            rolId: 1
        },
        {
            id: 1,
            nivelAcceso: 1,
            permisoId: 1,
            rolId: 2
        }
    ] 
}