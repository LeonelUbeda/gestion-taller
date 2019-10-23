import encriptar from '../encriptar'


test('Encripta un texto correctamente', () => {
    expect(encriptar('prueba')).toBe('655e786674d9d3e77bc05ed1de37b4b6bc89f788829f9f3c679e7687b410c89b')
})


test('La longitud del encriptado es de 64', () => {
    expect(encriptar('prueba')).toHaveLength(64)
})


test('El tipo de dato es un string', () => {
    expect(typeof encriptar('prueba')).toBe('string')
})
