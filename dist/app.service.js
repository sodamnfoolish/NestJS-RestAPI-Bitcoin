"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const utxo_dto_1 = require("./dtos/utxo.dto");
const axios_1 = require("axios");
const config_1 = require("./config");
let AppService = class AppService {
    async getHeight() {
        const url = `https://api.bitcore.io/api/BTC/${config_1.NETWORK}/block/tip`;
        let response;
        try {
            response = await axios_1.default.get(url);
        }
        catch (_a) {
            throw new common_1.HttpException('Service Unavailable', common_1.HttpStatus.SERVICE_UNAVAILABLE);
        }
        return response.data.height;
    }
    async getUtxo(address) {
        const url = `https://api.bitcore.io/api/BTC/${config_1.NETWORK}/address/${address}?unspent=true&limit=0`;
        let response;
        try {
            response = await axios_1.default.get(url);
        }
        catch (_a) {
            throw new common_1.HttpException('Service Unavailable', common_1.HttpStatus.SERVICE_UNAVAILABLE);
        }
        const utxo = [];
        response.data.forEach((res) => {
            utxo.push(new utxo_dto_1.UtxoDto(res));
        });
        utxo.sort(function (first, second) {
            return second.value - first.value;
        });
        return utxo;
    }
    async createRawTransaction(info) {
        const bitcoin = await require('bitcoinjs-lib');
        const network = await bitcoin.networks[config_1.NETWORK];
        const psbt = new bitcoin.Psbt({ network: network });
        const utxo = await this.getUtxo(info.addressFrom);
        let change = 0 - info.amount;
        let bytes = config_1.CONST_BYTES + config_1.BYTES_PER_OUT;
        for (const u of utxo) {
            change += u.value;
            bytes += config_1.BYTES_PER_IN;
            const url = `https://blockstream.info/${config_1.NETWORK}/api/tx/${u.txId}/hex`;
            let response;
            try {
                response = await axios_1.default.get(url);
            }
            catch (_a) {
                throw new common_1.HttpException('Service Unavailable', common_1.HttpStatus.SERVICE_UNAVAILABLE);
            }
            await psbt.addInput({
                hash: u.txId,
                index: u.vout,
                nonWitnessUtxo: Buffer.from(response.data, 'hex'),
            });
            if (change >= bytes * config_1.FEE_PER_BYTE)
                break;
        }
        psbt.addOutput({
            address: info.addressTo,
            value: info.amount,
        });
        if (change < bytes * config_1.FEE_PER_BYTE)
            throw new common_1.HttpException('Bad Request', common_1.HttpStatus.BAD_REQUEST);
        if (change > (bytes + config_1.BYTES_PER_OUT) * config_1.FEE_PER_BYTE) {
            psbt.addOutput({
                address: info.addressFrom,
                value: change - (bytes + config_1.BYTES_PER_OUT) * config_1.FEE_PER_BYTE,
            });
        }
        if (info.addressFromWif !== undefined) {
            try {
                const keypair = bitcoin.ECPair.fromWIF(info.addressFromWif, network);
                await psbt.signAllInputs(keypair);
                psbt.validateSignaturesOfAllInputs();
                psbt.finalizeAllInputs();
                const tx = psbt.extractTransaction();
                return tx.toHex();
            }
            catch (_b) {
                throw new common_1.HttpException('Bad Request', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        else {
            const tx = psbt.__CACHE.__TX;
            return tx.toHex();
        }
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map