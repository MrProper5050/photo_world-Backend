import { Controller, Get,  Res } from '@nestjs/common';
import { join } from 'path';

@Controller('auth')
export class AuthController {

    @Get('/login')
    getLoginPage(@Res() res){
        res.sendFile(join(__dirname,'..','..','..','client','auth','login.html'))
    }

    @Get('/logout')
    logout(@Res() res){
        res.clearCookie('access_token')
        return res.redirect('/')
    }

    @Get('/reg')
    getRegPage(@Res() res){
        res.sendFile(join(__dirname,'..','..','..','client','auth','register.html'))
    }

}
