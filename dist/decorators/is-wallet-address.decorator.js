"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsWalletAddress = exports.WalletAddressValidator = void 0;
const class_validator_1 = require("class-validator");
const config_1 = require("../config");
const wav = require("wallet-address-validator");
let WalletAddressValidator = class WalletAddressValidator {
    validate(address, args) {
        if (address == undefined || address == null || typeof address != 'string')
            return false;
        return wav.validate(address, 'BTC', config_1.NETWORK);
    }
};
WalletAddressValidator = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: true })
], WalletAddressValidator);
exports.WalletAddressValidator = WalletAddressValidator;
function IsWalletAddress(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'IsWalletAddress',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: WalletAddressValidator,
        });
    };
}
exports.IsWalletAddress = IsWalletAddress;
//# sourceMappingURL=is-wallet-address.decorator.js.map