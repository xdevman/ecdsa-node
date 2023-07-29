import * as secp from 'ethereum-cryptography/secp256k1';
import { keccak256 } from 'ethereum-cryptography/keccak';
import { toHex, utf8ToBytes } from 'ethereum-cryptography/utils';


function hashMessage(message) {
    return keccak256(utf8ToBytes(message));

}

function signMessage(msg,privateKey) {
    return secp.secp256k1.sign(msg,privateKey)
    
}

export{hashMessage,signMessage}