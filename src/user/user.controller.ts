import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Injector } from '@nestjs/core/injector/injector';
import { UserService } from './user.service';
import { createUserDto } from './dto/createUser.dto'
import { LoginUserDto } from './dto/loginUser.dto';

@Controller('api/user')
export class UserController {

    constructor(private readonly userService: UserService){}

    @Get()
    getAll(){
        return this.userService.findAll()
    }

    @Post('registr')
    registration(@Body() data: createUserDto){
        // console.log('data:', data )
        return this.userService.create(data)
    }

    @Post('login')
    loginSystem(@Body() data: LoginUserDto){
        // console.log('data:', data )
        return this.userService.login(data)
    }

    @Delete('/remove/:id')
    removeUser(@Param('id')id: string){
        // console.log('id:',id)
        return this.userService.remove(id)
    }
}
