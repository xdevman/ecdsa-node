const secp = require("ethereum-cryptography/secp256k1")
const { toHex } = require('ethereum-cryptography/utils')
const { keccak256 } = require('ethereum-cryptography/keccak')
const { utf8ToBytes } = require('ethereum-cryptography/utils')

const privateKey = secp.secp256k1.utils.randomPrivateKey();
console.log('private Key: ', toHex(privateKey))

const publicKey = secp.secp256k1.getPublicKey(privateKey);
console.log('public Key: ', toHex(publicKey))

const addr0x = keccak256(publicKey.slice(1).slice(-20))
console.log("0x"+toHex(addr0x))
// change publicKey to 0x Address

