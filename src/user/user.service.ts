import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { createUserDto } from './dto/createUser.dto';
import { FindByDto } from './dto/findBy.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { User } from './user.model';
import { Image } from './images.model';
import { join } from 'path';

const shortid = require('shortid')
require('dotenv').config()
const jwt = require('jsonwebtoken')
import config from '../config'
const fs = require('fs')



@Injectable()
export class UserService {

    constructor(@InjectModel(User) private userModel: typeof User, @InjectModel(Image) private imageModel: typeof Image){}

    async findAll(): Promise<User[]>{
        return this.userModel.findAll();
    }

    async findOne(id:string){
        try {
            const user = await this.userModel.findOne({
                where: {
                    id
                }
            });
            if(!user) throw new Error('Invalid user')
            
            return { id: user.id, name: user.name, images: user.images, registatedIn: user.createdAt, role: user.role };
            
        } catch (error) {
            return null
        }
        
    }

    async findBy(findByDto: FindByDto) {
        try {
            
            const users = await this.userModel.findAll({ where:{
                [findByDto.by]:{
                    [Op.iLike]: '%'+[findByDto.value]+'%'
                }
            }})

            if(!users || users.length === 0){
                throw new Error("Coud not find user");
                
            }else{
                return users;
            }
            
        } catch (msg) {
            
            return {message: "Coud not find user"}
        }
        
    }

    async create(createUserDto: createUserDto){

        const validated = this.password_login_validate(createUserDto)
        if(validated !== 'OK'){
            return validated
        }
        const {name, password, role} = createUserDto

        const candidate = await User.findOne({ where:{ name } })
        if(candidate) return {message: 'User with this name already exist', state:'NOK'}
        
        try {
            let role = createUserDto.role || 'common'
            const user = User.build({...createUserDto, images:[], id:shortid.generate(), role})
            await user.save()

            const date = new Date()
            console.log(`User "${user.name}" registrated`,`[${date.getDay()}/${date.getMonth()}/${date.getFullYear()}]`,`${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`)

            return {message:'User successfully created', state:'OK'};
            
        } catch (e) {

            return {message: e.errors[0].message, state:'NOK'}
        }

        
    }
    password_login_validate(userObj){
        if(userObj.password.length < 6){
            return {message: 'Min password length 6 symbols', state:'NOK'}
        }
        return 'OK'
    }
    async login(loginUserDto: LoginUserDto){
        const validated = this.password_login_validate(loginUserDto)
        if(validated !== 'OK'){
            return validated
        }
        
        const{name, password} = loginUserDto
       
        try {
            
            const candidate = await User.findOne({ where:{ name } })
            if(!candidate) return {message: 'User with this name no exist', state:'NOK'}

            if(candidate.password === password){

                const userData = {id: candidate.id,name: candidate.name, images: candidate.images}

                const access_token = jwt.sign({
                    data: userData
                }, config.jwt_s);
                //log
                const date = new Date() 
                console.log(`User "${userData.name}" login`,`[${date.getDay()}/${date.getMonth()}/${date.getFullYear()}]`,`${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`)
                
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
                where:{ id }
            })
            if(!user){
                throw new Error("User undefined");
            }else{
                await user.destroy()
                return {message:'Deleted'}
            }
           
        } catch (e) {
            return {message:'User undefined'}
        }
        
    }

    async getAllImages(): Promise<Image[]>{
        
        return await this.imageModel.findAll()
        
    }

    async removeImage(imageName: string){
        console.log(imageName)
        try {
            //update user.images
            const candidate = await this.userModel.findOne({
                where:{
                    images: {
                        [Op.contains]: [imageName]
                    }
                }
            })
            if(candidate){
                let index = candidate.images.indexOf(imageName)
                candidate.images.splice(index,1)
                await User.update({images:candidate.images},{where:{id:candidate.id}})
            }
            
            //update all images
            let img = await Image.findOne({where:{name:imageName}})
            if(!img){
                throw new Error("Image undefined");
            }else{
                await img.destroy()
            }

            //delete from system
            
            fs.unlinkSync(join(__dirname,'..','..','client','assets','uploads',imageName))
            

            console.log(`image "${img.name}" deleted successfully`)
            return {message: 'OK'}
            
        } catch (error) {
            console.log(error)
            return {message:'Failure to delete image'}
        }
        
        
      
 
    }

    async addImage(imageName: string){
        try {
            const image = Image.build({name: imageName})
            await image.save()
        } catch (e) {
            console.log(e)
        }
    }
    
}
