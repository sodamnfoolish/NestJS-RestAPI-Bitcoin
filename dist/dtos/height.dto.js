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
exports.HeightDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("../config");
class HeightDto {
    constructor(height) {
        this.height = height;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        example: 2101816,
        description: `current ${config_1.NETWORK} height`
    }),
    __metadata("design:type", Number)
], HeightDto.prototype, "height", void 0);
exports.HeightDto = HeightDto;
//# sourceMappingURL=height.dto.js.map