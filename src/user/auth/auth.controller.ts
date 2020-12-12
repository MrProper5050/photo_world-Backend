import { Controller, Get, Req, Res } from '@nestjs/common';
import { join } from 'path';

@Controller('auth')
export class AuthController {

    @Get('/login')
    getLoginPage(@Res() res){
        res.sendFile(join(__dirname,'..','..','..','client','auth','login.html'))
    }

    @Get('/reg')
    getRegPage(@Res() res){
        res.sendFile(join(__dirname,'..','..','..','client','auth','register.html'))
    }

}
