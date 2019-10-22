interface Cliente{
    id? : string;
    nombre? : string;
    apellido? : string;
    direccion? : string;
    tipoCliente? : string | number;
    fechaRegistro? : string;
}

export default Cliente;