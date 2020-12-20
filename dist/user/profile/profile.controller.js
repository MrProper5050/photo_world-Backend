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
exports.ProfileController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user.service");
const jwt = require("jsonwebtoken");
const platform_express_1 = require("@nestjs/platform-express");
const storage_config_1 = require("./storage.config");
const user_model_1 = require("../user.model");
const config_1 = require("../../config");
const logger4js = require("log4js");
const logger = logger4js.getLogger();
let ProfileController = class ProfileController {
    constructor(userSevice) {
        this.userSevice = userSevice;
    }
    async getProfile(req, res) {
        const token = req.signedCookies['access_token'];
        const decoded = jwt.verify(token, config_1.default.jwt_s);
        const userId = decoded.data.id;
        const user = await this.userSevice.findOne(userId);
        if (!user)
            return res.status(404).render('404');
        if (user.images.length == 0) {
            return res.render('profile', { ID: user.id, name: user.name, noImages: 'No Images. Upload your first photo!', isMy: true });
        }
        return res.render('profile', { ID: user.id, name: user.name, images: user.images, isMy: true });
    }
    async getProfileById(id, req, res) {
        try {
            const token = req.signedCookies['access_token'];
            const decoded = jwt.verify(token, config_1.default.jwt_s);
            const userId = decoded.data.id;
            const user = await this.userSevice.findOne(id);
            if (!user) {
                return res.status(404).render('404');
            }
            if (userId === id) {
                if (user.images.length == 0) {
                    return res.render('profile', { ID: user.id, name: user.name, noImages: 'No Images. Upload your first photo!', isMy: true });
                }
                return res.render('profile', { ID: user.id, name: user.name, images: user.images, isMy: true });
            }
            else {
                if (user.images.length == 0) {
                    return res.render('profile', { ID: user.id, name: user.name, noImages: 'No Images. Upload your first photo!' });
                }
                return res.render('profile', { ID: user.id, name: user.name, images: user.images });
            }
        }
        catch (e) {
            return res.status(333).redirect('/');
        }
    }
    async uploadImage(file, req, res) {
        const fileName = file.filename;
        let file_ex = fileName.split('.')[fileName.split('.').length - 1].toLowerCase();
        if (file.size > 10000000) {
            return res.status(304).json({ message: 'file too large(max size 10MB)' });
        }
        if (!(file_ex === 'png' ||
            file_ex === 'jpg' ||
            file_ex === 'jpeg' ||
            file_ex === 'tiff' ||
            file_ex === 'gif' ||
            file_ex === 'webp' ||
            file_ex === 'svg')) {
            return res.status(304).json({ message: 'file extension is invalid' });
        }
        try {
            const token = req.signedCookies['access_token'];
            if (!token)
                return res.status(403).json('FORBIDDEN');
            const decoded = await jwt.verify(token, config_1.default.jwt_s);
            const userId = decoded.data.id;
            const user = await this.userSevice.findOne(userId);
            let images = user.images;
            images.unshift(fileName);
            await user_model_1.User.update({ images }, { where: { id: userId } });
            await this.userSevice.addImage(fileName);
            logger.debug(`User "${user.name}" upload image`);
            return res.status(202).json({ message: 'upload is successful' });
        }
        catch (e) {
            console.log(e);
            return res.status(402).json({ message: 'UPLOAD ERROR' });
        }
    }
    async deleteImage(data) {
        return this.userSevice.removeImage(data.imageName);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getProfile", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Req()), __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getProfileById", null);
__decorate([
    common_1.Post('/upload'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file', { storage: storage_config_1.storage })),
    __param(0, common_1.UploadedFile()), __param(1, common_1.Req()), __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "uploadImage", null);
__decorate([
    common_1.Post('/deleteImage'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "deleteImage", null);
ProfileController = __decorate([
    common_1.Controller('profile'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], ProfileController);
exports.ProfileController = ProfileController;
//# sourceMappingURL=profile.controller.js.map