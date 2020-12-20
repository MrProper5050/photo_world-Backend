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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const createUser_dto_1 = require("../user/dto/createUser.dto");
const findBy_dto_1 = require("../user/dto/findBy.dto");
const admin_service_1 = require("./admin.service");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async getAdminPanel() {
        return { msg: 's' };
    }
    async getUsersControlPanel() {
        return { msg: 's' };
    }
    async getImagesControlPanel() {
        return { msg: 's' };
    }
    async getAllUsers() {
        return await this.adminService.findAll();
    }
    async getBy(findByDto) {
        return await this.adminService.findBy(findByDto);
    }
    async registration(data, resp) {
        const result = await this.adminService.create(data);
        if (result['message'] === "User successfully created") {
            return resp.status(201).json(result);
        }
        else {
            return resp.status(400).json(result);
        }
    }
    removeUser(data) {
        return this.adminService.remove(data.id);
    }
    removeUserByIdParamUrl(id) {
        return this.adminService.remove(id);
    }
    getAllImages() {
        return this.adminService.getAllImages();
    }
    removeImageByIdParamUrl(name) {
        return this.adminService.removeImage(name);
    }
};
__decorate([
    common_1.Render('admin/index'),
    common_1.Get('panel'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAdminPanel", null);
__decorate([
    common_1.Render('admin/users'),
    common_1.Get('panel/users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getUsersControlPanel", null);
__decorate([
    common_1.Render('admin/images'),
    common_1.Get('panel/images'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getImagesControlPanel", null);
__decorate([
    common_1.Post('/users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllUsers", null);
__decorate([
    common_1.Post('/users/getBy'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getBy", null);
__decorate([
    common_1.Post('/users/reg'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "registration", null);
__decorate([
    common_1.Delete('/users/remove'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "removeUser", null);
__decorate([
    common_1.Delete('/users/remove/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "removeUserByIdParamUrl", null);
__decorate([
    common_1.Post('/images'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getAllImages", null);
__decorate([
    common_1.Delete('/images/remove/:name'),
    __param(0, common_1.Param('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "removeImageByIdParamUrl", null);
AdminController = __decorate([
    common_1.Controller('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map