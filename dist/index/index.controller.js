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
exports.IndexController = void 0;
const common_1 = require("@nestjs/common");
const index_service_1 = require("./index.service");
const jwt = require("jsonwebtoken");
let IndexController = class IndexController {
    constructor(indexService) {
        this.indexService = indexService;
    }
    async getIndexPageAndUsers(req) {
        try {
            const token = req.signedCookies['access_token'];
            const decoded = jwt.verify(token, process.env.JWT_SECRECT);
            return { users: await this.indexService.getAllUserAndTheirLastImage(), isAuth: true };
        }
        catch (e) {
            return { users: await this.indexService.getAllUserAndTheirLastImage() };
        }
    }
};
__decorate([
    common_1.Get(),
    common_1.Render('index'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IndexController.prototype, "getIndexPageAndUsers", null);
IndexController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [index_service_1.IndexService])
], IndexController);
exports.IndexController = IndexController;
//# sourceMappingURL=index.controller.js.map