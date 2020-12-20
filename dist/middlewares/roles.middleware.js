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
exports.RolesMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const user_service_1 = require("../user/user.service");
const config_1 = require("../config");
let RolesMiddleware = class RolesMiddleware {
    constructor(userService) {
        this.userService = userService;
    }
    async use(req, res, next) {
        try {
            const token = req.signedCookies['access_token'];
            const decoded = await jwt.verify(token, config_1.default.jwt_s);
            const userId = decoded.data.id;
            const user = await this.userService.findOne(userId);
            if (user.role !== 'admin') {
                return res.status(404).render('404');
            }
        }
        catch (error) {
            return res.status(404).render('404');
        }
        next();
    }
};
RolesMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], RolesMiddleware);
exports.RolesMiddleware = RolesMiddleware;
//# sourceMappingURL=roles.middleware.js.map