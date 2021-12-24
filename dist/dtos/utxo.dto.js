"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtxoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UtxoDto {
    constructor(data) {
        this.txId = data.mintTxid;
        this.vout = data.mintIndex;
        this.value = data.value;
        this.address = data.address;
        this.scriptPubKey = data.script;
        this.confirmations = data.confirmations;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        example: '499804075c59befe501c29ec60747c54802396b5a64bd0d81e6cb471787b5a80',
        description: 'tx id(hash) in UTXO'
    }),
    __metadata("design:type", String)
], UtxoDto.prototype, "txId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        example: 1,
        description: 'index of tx output in UTXO'
    }),
    __metadata("design:type", Number)
], UtxoDto.prototype, "vout", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        example: 471214,
        description: 'amount of tx output in UTXO (value in satoshi)'
    }),
    __metadata("design:type", Number)
], UtxoDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        example: 'mktfwcgbQUgPsHxkJt6BSqhaCopJXBG9et',
        description: 'address in UTXO'
    }),
    __metadata("design:type", String)
], UtxoDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        example: '76a9143af4213a8c4d691197a901ad3122b1ffb5885b7288ac',
        description: 'scriptPubKey in UTXO'
    }),
    __metadata("design:type", String)
], UtxoDto.prototype, "scriptPubKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        example: -1,
        description: 'number of confirmed blocks'
    }),
    __metadata("design:type", Number)
], UtxoDto.prototype, "confirmations", void 0);
exports.UtxoDto = UtxoDto;
//# sourceMappingURL=utxo.dto.js.map