
import SHA256 from 'crypto-js/sha256'



/**
 * 
 * @param texto Recibe un string y lo encripta con SHA256
 * @return Retorna el el string encriptado
 */
const encriptar = (texto: string) => {
    return SHA256(texto).toString()
}

export default encriptar