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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
let AdminController = class AdminController {
    async getAdminPanel() {
        return { msg: 's' };
    }
    async getUsersControlPanel() {
        return { msg: 's' };
    }
    async getImagesControlPanel() {
        return { msg: 's' };
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
AdminController = __decorate([
    common_1.Controller('admin')
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map