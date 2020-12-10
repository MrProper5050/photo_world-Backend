import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '../user.service';

@Controller('profile')
export class ProfileController {
    constructor(private readonly userSevice: UserService){}

    @Get(':id')
    getProfile(@Param('id') id:string){
        return this.userSevice.findOne(id)
    }

}
