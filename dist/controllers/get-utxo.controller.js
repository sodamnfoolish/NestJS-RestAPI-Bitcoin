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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUtxoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_service_1 = require("../app.service");
const get_utxo_dto_1 = require("../dtos/get-utxo.dto");
const utxo_dto_1 = require("../dtos/utxo.dto");
let GetUtxoController = class GetUtxoController {
    constructor(appService) {
        this.appService = appService;
    }
    async getUtxo(getUtxo) {
        return await this.appService.getUtxo(getUtxo.address);
    }
};
__decorate([
    (0, common_1.Get)(':address'),
    (0, swagger_1.ApiResponse)({ type: utxo_dto_1.UtxoDto, isArray: true, description: 'OK', status: common_1.HttpStatus.OK }),
    (0, swagger_1.ApiResponse)({ description: 'Bad Request', status: common_1.HttpStatus.BAD_REQUEST }),
    (0, swagger_1.ApiResponse)({ description: 'Service Unavailable', status: common_1.HttpStatus.SERVICE_UNAVAILABLE }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, disableErrorMessages: true, stopAtFirstError: true, whitelist: true, forbidNonWhitelisted: true })),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_utxo_dto_1.GetUtxoDto]),
    __metadata("design:returntype", Promise)
], GetUtxoController.prototype, "getUtxo", null);
GetUtxoController = __decorate([
    (0, swagger_1.ApiTags)('Requests'),
    (0, common_1.Controller)('get-utxo'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], GetUtxoController);
exports.GetUtxoController = GetUtxoController;
//# sourceMappingURL=get-utxo.controller.js.map