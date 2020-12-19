import { Body, Controller, Delete, Get, Logger, Param, Post, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dto/createUser.dto'
import { LoginUserDto } from './dto/loginUser.dto';
import { FindByDto } from './dto/findBy.dto';

@Controller('api/user')
export class UserController {

    constructor(private readonly userService: UserService){}

    @Post()
    async getAll(@Req() req: any){
        // console.log(req.cookies)
        return await this.userService.findAll()
    }

    @Post('getBy')
    async getBy(@Body() findByDto: FindByDto){
        return await this.userService.findBy(findByDto)
    }

    @Post('reg')
    async registration(@Body() data: createUserDto, @Res() resp){
        // console.log('data:', data )
        const result = await this.userService.create(data)
        if(result['message'] === "User successfully created"){
            return resp.status(201).json(result)
        }else{
            return resp.status(400).json(result)
        }

        
    }

    @Post('login')
    async loginSystem(@Body() data: LoginUserDto,  @Res() res: any){
        // this.userService.deleteImage('1607836877677..jpg')
        const result = await this.userService.login(data)
        if(typeof result === 'string'){
            //set cookie
            res.cookie('access_token', result, { signed:true, httpOnly: true, sameSite:true })
           
            return res.status(201).json({state:'OK'})
        }else{
            return res.status(403).json(result)
        }
        
    }

    @Delete('remove')
    removeUser(@Body() data){
        // console.log('id:',id)
        return this.userService.remove(data.id)
    }

    @Delete('remove/:id')
    removeUserByIdParamUrl(@Param('id')id: string){
        // console.log('id:',id)
        return this.userService.remove(id)
    }


    
}
