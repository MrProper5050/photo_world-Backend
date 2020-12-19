"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt = require('jsonwebtoken');
const config_1 = require("../config");
let AuthMiddleware = class AuthMiddleware {
    use(req, res, next) {
        switch (req.originalUrl) {
            case "/auth/login":
                if (req.signedCookies['access_token'])
                    return res.redirect('/');
                next();
                break;
            case "/auth/reg":
                if (req.signedCookies['access_token'])
                    return res.redirect('/');
                next();
                break;
            case "/profile":
                if (!req.signedCookies['access_token'])
                    return res.redirect('/');
                const token = req.signedCookies['access_token'];
                try {
                    const decoded = jwt.verify(token, config_1.default.jwt_s);
                    next();
                }
                catch (e) {
                    return res.redirect('/');
                }
                break;
            default:
                next();
                break;
        }
    }
};
AuthMiddleware = __decorate([
    common_1.Injectable()
], AuthMiddleware);
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map