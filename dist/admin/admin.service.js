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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const findBy_dto_1 = require("../user/dto/findBy.dto");
const user_service_1 = require("../user/user.service");
let AdminService = class AdminService {
    constructor(userService) {
        this.userService = userService;
    }
    async findAll() {
        return this.userService.findAll();
    }
    async findBy(findByDto) {
        return this.userService.findBy(findByDto);
    }
    async remove(id) {
        return this.userService.remove(id);
    }
    async getAllImages() {
        return await this.userService.getAllImages();
    }
    async removeImage(name) {
        return this.userService.removeImage(name);
    }
};
AdminService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map