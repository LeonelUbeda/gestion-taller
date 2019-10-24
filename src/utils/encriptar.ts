
import SHA256 from 'crypto-js/sha256'

const encriptar = (texto: string) => {
    return SHA256(texto).toString()
}

export default encriptar