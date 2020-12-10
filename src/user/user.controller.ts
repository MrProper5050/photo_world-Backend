import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Injector } from '@nestjs/core/injector/injector';
import { UserService } from './user.service';
import { createUserDto } from './dto/createUser.dto'

@Controller('api/user')
export class UserController {

    constructor(private readonly userService: UserService){}

    @Get()
    getAll(){
        return this.userService.findAll()
    }

    @Post('create')
    create(@Body() data: createUserDto){
        // console.log('data:', data )
        return this.userService.create(data)
    }

    @Delete('/remove/:id')
    removeUser(@Param('id')id: string){
        // console.log('id:',id)
        return this.userService.remove(id)
    }
}
