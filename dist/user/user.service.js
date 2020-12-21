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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_2 = require("sequelize");
const user_model_1 = require("./user.model");
const images_model_1 = require("./images.model");
const path_1 = require("path");
const shortid = require('shortid');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const config_1 = require("../config");
const fs = require('fs');
let UserService = class UserService {
    constructor(userModel, imageModel) {
        this.userModel = userModel;
        this.imageModel = imageModel;
    }
    async findAll() {
        return this.userModel.findAll();
    }
    async findOne(id) {
        try {
            const user = await this.userModel.findOne({
                where: {
                    id
                }
            });
            if (!user)
                throw new Error('Invalid user');
            return { id: user.id, name: user.name, images: user.images, registatedIn: user.createdAt, role: user.role };
        }
        catch (error) {
            return null;
        }
    }
    async findOneWithParamsObject(param) {
        return await this.userModel.findOne(param);
    }
    async findBy(findByDto) {
        try {
            const users = await this.userModel.findAll({ where: {
                    [findByDto.by]: {
                        [sequelize_2.Op.iLike]: '%' + [findByDto.value] + '%'
                    }
                } });
            if (!users || users.length === 0) {
                throw new Error("Coud not find user");
            }
            else {
                return users;
            }
        }
        catch (msg) {
            return { message: "Coud not find user" };
        }
    }
    async create(createUserDto) {
        const validated = this.password_login_validate(createUserDto);
        if (validated !== 'OK') {
            return validated;
        }
        const { name, password, role } = createUserDto;
        const candidate = await user_model_1.User.findOne({ where: { name } });
        if (candidate)
            return { message: 'User with this name already exist', state: 'NOK' };
        try {
            let role = createUserDto.role || 'common';
            const user = user_model_1.User.build(Object.assign(Object.assign({}, createUserDto), { images: [], id: shortid.generate(), role }));
            await user.save();
            const date = new Date();
            console.log(`User "${user.name}" registrated`, `[${date.getDay()}/${date.getMonth()}/${date.getFullYear()}]`, `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`);
            return { message: 'User successfully created', state: 'OK' };
        }
        catch (e) {
            return { message: e.errors[0].message, state: 'NOK' };
        }
    }
    password_login_validate(userObj) {
        if (userObj.password.length < 6) {
            return { message: 'Min password length 6 symbols', state: 'NOK' };
        }
        return 'OK';
    }
    async login(loginUserDto) {
        const validated = this.password_login_validate(loginUserDto);
        if (validated !== 'OK') {
            return validated;
        }
        const { name, password } = loginUserDto;
        try {
            const candidate = await user_model_1.User.findOne({ where: { name } });
            if (!candidate)
                return { message: 'User with this name no exist', state: 'NOK' };
            if (candidate.password === password) {
                const userData = { id: candidate.id, name: candidate.name, images: candidate.images };
                const access_token = jwt.sign({
                    data: userData
                }, config_1.default.jwt_s);
                const date = new Date();
                console.log(`User "${userData.name}" login`, `[${date.getDay()}/${date.getMonth()}/${date.getFullYear()}]`, `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`);
                return access_token;
            }
            else {
                return { message: 'Invalid password', state: 'NOK' };
            }
        }
        catch (err) {
            return { error: err.errors[0].message };
        }
    }
    async remove(id) {
        try {
            const user = await this.userModel.findOne({
                where: { id }
            });
            if (!user) {
                throw new Error("User undefined");
            }
            else {
                await user.destroy();
                return { message: 'Deleted' };
            }
        }
        catch (e) {
            return { message: 'User undefined' };
        }
    }
    async getAllImages() {
        return await this.imageModel.findAll();
    }
    async removeImage(imageName) {
        console.log(imageName);
        try {
            const candidate = await this.userModel.findOne({
                where: {
                    images: {
                        [sequelize_2.Op.contains]: [imageName]
                    }
                }
            });
            if (candidate) {
                let index = candidate.images.indexOf(imageName);
                candidate.images.splice(index, 1);
                await user_model_1.User.update({ images: candidate.images }, { where: { id: candidate.id } });
            }
            let img = await images_model_1.Image.findOne({ where: { name: imageName } });
            if (!img) {
                throw new Error("Image undefined");
            }
            else {
                await img.destroy();
            }
            fs.unlinkSync(path_1.join(__dirname, '..', '..', 'client', 'assets', 'uploads', imageName));
            console.log(`image "${img.name}" deleted successfully`);
            return { message: 'OK' };
        }
        catch (error) {
            console.log(error);
            return { message: 'Failure to delete image' };
        }
    }
    async addImage(imageName) {
        try {
            const image = images_model_1.Image.build({ name: imageName });
            await image.save();
        }
        catch (e) {
            console.log(e);
        }
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, sequelize_1.InjectModel(user_model_1.User)), __param(1, sequelize_1.InjectModel(images_model_1.Image)),
    __metadata("design:paramtypes", [Object, Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map