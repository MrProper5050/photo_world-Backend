import { Injectable } from '@nestjs/common';
import { createUserDto } from 'src/user/dto/createUser.dto';
import { FindByDto } from 'src/user/dto/findBy.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AdminService {

    constructor(private userService: UserService){}

    
    async findAll(){
        return this.userService.findAll()
    }
    async findBy(findByDto: FindByDto){
        return this.userService.findBy(findByDto)
    }
    async create(createUserDto: createUserDto){
        return this.userService.create(createUserDto)
    }
    async remove(id: string){
        return this.userService.remove(id)
    }
    async getAllImages(){
        return await this.userService.getAllImages()
    }
    async removeImage(name: string){
        return this.userService.removeImage(name)
    }
}
