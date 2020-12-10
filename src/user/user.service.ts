import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createUserDto } from './dto/createUser.dto';
import { User } from './user.model';
const shortid = require('shortid')

@Injectable()
export class UserService {

    constructor(@InjectModel(User) private userModel: typeof User){}

    async findAll(): Promise<User[]>{
        return this.userModel.findAll();
    }

    async findOne(id:string): Promise<User>{
        return this.userModel.findOne({
            where:{
                id
            }
        })
    }

    async create(createUserDto: createUserDto){
        
        try {
            const user = User.build({...createUserDto, images:[''], id:shortid.generate()})
            await user.save()

            return user;
            
        } catch (e) {

            return {error: e.errors[0].message}
        }

        
    }

    async remove(id: string){
        try {
            const user = await this.findOne(id);
            await user.destroy()
            return {ok:'ok'}
        } catch (e) {
            return {error:'User undefined'}
        }
        
    }

}
