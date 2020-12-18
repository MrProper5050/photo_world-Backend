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
const shortid = require('shortid');
require('dotenv').config();
const jwt = require('jsonwebtoken');
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findAll() {
        return this.userModel.findAll();
    }
    async findOne(id) {
        const user = await this.userModel.findOne({
            where: {
                id
            }
        });
        return { id: user.id, name: user.name, images: user.images, registatedIn: user.createdAt, role: user.role };
    }
    async findBy(findByDto) {
        console.log('1)findByDTO: ', findByDto);
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
        const { name, password, role } = createUserDto;
        const candidate = await user_model_1.User.findOne({ where: { name } });
        if (candidate)
            return { message: 'User with this name already exist', state: 'NOK' };
        try {
            const user = user_model_1.User.build(Object.assign(Object.assign({}, createUserDto), { images: [], id: shortid.generate() }));
            await user.save();
            return { message: 'User successfully created', state: 'OK' };
        }
        catch (e) {
            return { message: e.errors[0].message, state: 'NOK' };
        }
    }
    async login(loginUserDto) {
        const { name, password } = loginUserDto;
        try {
            const candidate = await user_model_1.User.findOne({ where: { name } });
            if (!candidate)
                return { message: 'User with this name no exist', state: 'NOK' };
            if (candidate.password === password) {
                const userData = { id: candidate.id, name: candidate.name, images: candidate.images };
                const access_token = jwt.sign({
                    data: userData
                }, process.env.JWT_SECRECT);
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
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, sequelize_1.InjectModel(user_model_1.User)),
    __metadata("design:paramtypes", [Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map