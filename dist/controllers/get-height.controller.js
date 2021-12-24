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
exports.GetHeightController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_service_1 = require("../app.service");
const height_dto_1 = require("../dtos/height.dto");
let GetHeightController = class GetHeightController {
    constructor(appService) {
        this.appService = appService;
    }
    async getHeight() {
        return new height_dto_1.HeightDto(await this.appService.getHeight());
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({ type: height_dto_1.HeightDto, description: 'OK', status: common_1.HttpStatus.OK }),
    (0, swagger_1.ApiResponse)({ description: 'Service Unavailable', status: common_1.HttpStatus.SERVICE_UNAVAILABLE }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, disableErrorMessages: true, stopAtFirstError: true, whitelist: true, forbidNonWhitelisted: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GetHeightController.prototype, "getHeight", null);
GetHeightController = __decorate([
    (0, swagger_1.ApiTags)('Requests'),
    (0, common_1.Controller)('get-height'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], GetHeightController);
exports.GetHeightController = GetHeightController;
//# sourceMappingURL=get-height.controller.js.map