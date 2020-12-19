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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getAll(req) {
        return await this.userService.findAll();
    }
    async getBy(findByDto) {
        return await this.userService.findBy(findByDto);
    }
    async registration(data, resp) {
        const result = await this.userService.create(data);
        if (result['message'] === "User successfully created") {
            return resp.status(201).json(result);
        }
        else {
            return resp.status(400).json(result);
        }
    }
    async loginSystem(data, res) {
        const result = await this.userService.login(data);
        if (typeof result === 'string') {
            res.cookie('access_token', result, { signed: true, httpOnly: true, sameSite: true });
            return res.status(201).json({ state: 'OK' });
        }
        else {
            return res.status(403).json(result);
        }
    }
    removeUser(data) {
        return this.userService.remove(data.id);
    }
    removeUserByIdParamUrl(id) {
        return this.userService.remove(id);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAll", null);
__decorate([
    common_1.Post('getBy'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getBy", null);
__decorate([
    common_1.Post('reg'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "registration", null);
__decorate([
    common_1.Post('login'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "loginSystem", null);
__decorate([
    common_1.Delete('remove'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "removeUser", null);
__decorate([
    common_1.Delete('remove/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "removeUserByIdParamUrl", null);
UserController = __decorate([
    common_1.Controller('api/user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map