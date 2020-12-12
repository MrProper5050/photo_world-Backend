import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { User } from './user.model';
const shortid = require('shortid')
require('dotenv').config()
const jwt = require('jsonwebtoken')

@Injectable()
export class UserService {

    constructor(@InjectModel(User) private userModel: typeof User){}

    async findAll(): Promise<User[]>{
        return this.userModel.findAll();
    }

    async findOne(id:string){
        const user = await this.userModel.findOne({
            where:{
                id
            }
        })
        return {id: user.id, name: user.name, images:user.images, registatedIn: user.createdAt}
    }

    async create(createUserDto: createUserDto){

        const {name, password} = createUserDto
        const candidate = await User.findOne({ where:{ name } })

        if(candidate) return {message: 'User with this name already exist', state:'NOK'}
        
        try {
            const user = User.build({...createUserDto, images:[''], id:shortid.generate()})
            await user.save()

            return {message:'User successfully created', state:'OK'};
            
        } catch (e) {

            return {message: e.errors[0].message, state:'NOK'}
        }

        
    }
    
    async login(loginUserDto: LoginUserDto){

        const{name, password} = loginUserDto
       
        try {
            
            const candidate = await User.findOne({ where:{ name } })
            if(!candidate) return {message: 'User with this name no exist', state:'NOK'}

            if(candidate.password === password){

                const userData = {id: candidate.id,name: candidate.name, images: candidate.images}

                const access_token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: userData
                  }, process.env.JWT_SECRECT);

                return access_token 

            }else{
                return {message: 'Invalid password', state:'NOK'}
            }
            
    

        } catch (err) {
            return {error: err.errors[0].message}
        }

    }

    async remove(id: string){
        try {
            const user = await this.userModel.findOne({
                where:{
                    id
                }
            })
            await user.destroy()
            return {ok:'ok'}
        } catch (e) {
            return {error:'User undefined'}
        }
        
    }

}