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
exports.CreateRawTransactionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_tx_dto_1 = require("../dtos/create-tx.dto");
const tx_dto_1 = require("../dtos/tx.dto");
const app_service_1 = require("../app.service");
let CreateRawTransactionController = class CreateRawTransactionController {
    constructor(appService) {
        this.appService = appService;
    }
    async CreateRawTransaction(createTx) {
        return new tx_dto_1.TxDto(await this.appService.createRawTransaction(createTx));
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({ type: create_tx_dto_1.CreateTxDto, description: 'CreateTxDto' }),
    (0, swagger_1.ApiResponse)({ type: tx_dto_1.TxDto, description: 'Created', status: common_1.HttpStatus.CREATED }),
    (0, swagger_1.ApiResponse)({ description: 'Bad Request', status: common_1.HttpStatus.BAD_REQUEST }),
    (0, swagger_1.ApiResponse)({ description: 'Service Unavailable', status: common_1.HttpStatus.SERVICE_UNAVAILABLE }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, disableErrorMessages: true, stopAtFirstError: true, whitelist: true, forbidNonWhitelisted: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tx_dto_1.CreateTxDto]),
    __metadata("design:returntype", Promise)
], CreateRawTransactionController.prototype, "CreateRawTransaction", null);
CreateRawTransactionController = __decorate([
    (0, swagger_1.ApiTags)('Requests'),
    (0, common_1.Controller)('create-raw-transaction'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], CreateRawTransactionController);
exports.CreateRawTransactionController = CreateRawTransactionController;
//# sourceMappingURL=create-raw-transaction.controller.js.map