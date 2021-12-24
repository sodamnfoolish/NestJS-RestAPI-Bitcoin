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
exports.CreateTxDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const is_wallet_address_decorator_1 = require("../decorators/is-wallet-address.decorator");
class CreateTxDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, is_wallet_address_decorator_1.IsWalletAddress)(),
    (0, swagger_1.ApiProperty)({
        required: true,
        example: 'mktfwcgbQUgPsHxkJt6BSqhaCopJXBG9et',
        description: 'address from',
    }),
    __metadata("design:type", String)
], CreateTxDto.prototype, "addressFrom", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 'cUrnQ6qZL7pXxAb98QjwSyghY6xqvk2aevb8DvNzMMk42543WpVU',
        description: 'WIF address from',
    }),
    __metadata("design:type", String)
], CreateTxDto.prototype, "addressFromWif", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, is_wallet_address_decorator_1.IsWalletAddress)(),
    (0, swagger_1.ApiProperty)({
        required: true,
        example: 'n1ufspXJwafVPxyHgYbTCdDq3S74m9zTV1',
        description: 'address to',
    }),
    __metadata("design:type", String)
], CreateTxDto.prototype, "addressTo", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, swagger_1.ApiProperty)({
        required: true,
        example: 1000,
        description: 'amount (value in satoshis)',
    }),
    __metadata("design:type", Number)
], CreateTxDto.prototype, "amount", void 0);
exports.CreateTxDto = CreateTxDto;
//# sourceMappingURL=create-tx.dto.js.map