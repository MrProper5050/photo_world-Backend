import { Body, Controller, Delete, Get, Param, Post, Req, Res } from '@nestjs/common';
import { Injector } from '@nestjs/core/injector/injector';
import { UserService } from './user.service';
import { createUserDto } from './dto/createUser.dto'
import { LoginUserDto } from './dto/loginUser.dto';

@Controller('api/user')
export class UserController {

    constructor(private readonly userService: UserService){}

    @Get()
    getAll(@Req() req: any){
        console.log(req.cookies)
        return this.userService.findAll()
    }

    @Post('registr')
    registration(@Body() data: createUserDto){
        // console.log('data:', data )
        return this.userService.create(data)
    }

    @Post('login')
    async loginSystem(@Body() data: LoginUserDto,  @Res() res: any){
        console.log('data:',data)
        const result = await this.userService.login(data)
        console.log('result:', result )
        if(typeof result === 'string'){
            return res.cookie('access_token', result).status(201).json('OK')
        }else{
            return res.status(403).json(result)
        }
        
    }

    @Delete('/remove/:id')
    removeUser(@Param('id')id: string){
        // console.log('id:',id)
        return this.userService.remove(id)
    }
}
