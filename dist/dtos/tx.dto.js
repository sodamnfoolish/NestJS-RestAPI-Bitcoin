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
exports.TxDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class TxDto {
    constructor(hex) {
        this.hex = hex;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        example: '0200000001805a7b7871b46c1ed8d04ba6b5962380547c7460ec291c50febe595c07049849010000006a47304402210081d308604fe2d4536d5e97133c90c66368a52cdb570e45a1e1a0989537065878021f4257574767245d8082ec3e6940f8c7cd1db588dd01da9185d72becdb40241e012103df1764a3b18d66a95bb520c1714e8e2b0f315f7033c68983e617594852f071b2ffffffff02e8030000000000001976a914dfae60bd2cb2698a7609a5c96741360e94795fef88acb2220700000000001976a9143af4213a8c4d691197a901ad3122b1ffb5885b7288ac00000000',
        description: 'raw transaction in hex'
    }),
    __metadata("design:type", String)
], TxDto.prototype, "hex", void 0);
exports.TxDto = TxDto;
//# sourceMappingURL=tx.dto.js.map