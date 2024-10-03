import * as assert from "node:assert";

const bit39 = require("bip39")
const ethers = require('ethers');
import {createEthAddress, ImportPrivateKeyToAddress, ImportPublickeyToAddress} from "@/ethereum/address/address";
import {ethSign, EthSignParams} from "@/ethereum/sign/sign";
// import {publicKeyCombine} from "secp256k1";

describe('ethereum wallet test', () => {
    test('mpc public key to address', () => {
        const pubKeyPoint = [
            2, 211, 154, 205, 237, 94, 172, 44, 10, 252, 232, 165, 187, 22, 53, 235, 218, 108, 26, 42, 122, 130, 38, 45, 110, 233, 154, 55, 141, 135, 170, 96, 220

        ]
        const address = ethers.utils.computeAddress("0x" + Buffer.from(pubKeyPoint).toString('hex'))
        console.log("wallet address:", address);
    })

    test('createAddress', () => {
        const mnemonic = "venue melody want coil hurt okay fabric scare resemble post silk rude";
        const seed = bit39.mnemonicToSeedSync(mnemonic);
        let result = createEthAddress(seed, '0');
        console.log(result);
        assert.strictEqual("0x4b1fEf0D4144711a5203AfBC40a6166eEb29CF80", JSON.parse(result).address);
    })

    test('importprivatekey to address', () => {
        const privateKey = "0xcc4365160bfb0c10a99e57f61714b606a0fb3f9a5b71c55656778755ef779c10"
        let result = ImportPrivateKeyToAddress(privateKey);
        assert.strictEqual("0x4b1fEf0D4144711a5203AfBC40a6166eEb29CF80", JSON.parse(result).address);

    })

    test('importpublickey to address', () => {
        const publickey = '0x02a004bc209f74527bb8199ec5f2ac1f307702ff1e4f6699b0283a4e1fe171615c';
        let result = ImportPublickeyToAddress(publickey);
        assert.strictEqual("0x4b1fEf0D4144711a5203AfBC40a6166eEb29CF80", result);
    });

    test('sign eth eip1559', async () => {
        const params:EthSignParams={
            "privateKey": "0cbb2ff952da876c4779200c83f6b90d73ea85a8da82e06c2276a11499922720",
            "nonce": 54,
            "from": "0x72fFaA289993bcaDa2E01612995E5c75dD81cdBC",
            "to": "0x35096AD62E57e86032a3Bb35aDaCF2240d55421D",
            "amount": "0.01",
            "gasLimit": 21000,
            "maxFeePerGas": 2900000000,
            "maxPriorityFeePerGas": 2600000000,
            "decimal": 18,
            "chainId": 1,
            "tokenAddress": "0x00"
        }
        const rawHex = ethSign(params)
        console.log(rawHex)
    });

    test('sign usdt eip1559', async () => {
        const params:EthSignParams={
            "privateKey": "0cbb2ff952da876c4779200c83f6b90d73ea85a8da82e06c2276a11499922720",
            "nonce": 45,
            "from": "0x72fFaA289993bcaDa2E01612995E5c75dD81cdBC",
            "to": "0x35096AD62E57e86032a3Bb35aDaCF2240d55421D",
            "amount": "0.01",
            "gasLimit": 120000,
            "maxFeePerGas": 2900000000,
            "maxPriorityFeePerGas": 2600000000,
            "decimal": 6,
            "chainId": 1,
            "tokenAddress": "0xdAC17F958D2ee523a2206206994597C13D831ec7"
        }
        const rawHex = ethSign(params)
        console.log(rawHex)
    });
})