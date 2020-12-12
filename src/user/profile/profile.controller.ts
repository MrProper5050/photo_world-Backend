import { Controller, Get, Param, Req } from '@nestjs/common';
import { UserService } from '../user.service';
import * as jwt from 'jsonwebtoken'

@Controller('profile')
export class ProfileController {
    constructor(private readonly userSevice: UserService){}


    @Get()
    getProfile(@Req() req:any) {
        const token = req.cookies['access_token'];
        const decoded = jwt.verify(token, process.env.JWT_SECRECT)
        console.log(decoded)
        const userId = decoded.data.id
        return this.userSevice.findOne(userId)
    }

    @Get(':id')
    getProfileById(@Param('id') id:string) {
        return this.userSevice.findOne(id)
    }

}
