const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const key = ec.genKeyPair();
const pubkey = key.getPublic('hex');
const privatekey = key.getPrivate('hex');

console.log("pubkey: " + pubkey);
console.log("privatekey: " + privatekey);
