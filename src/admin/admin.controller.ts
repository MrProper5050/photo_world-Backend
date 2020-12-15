import { Controller, Get, Render } from '@nestjs/common';

@Controller('admin')
export class AdminController {

    @Render('admin/index')
    @Get('panel')
    async getAdminPanel(){
        return {msg:'s'}
    }

    @Render('admin/users')
    @Get('panel/users')
    async getUsersControlPanel(){
        return {msg:'s'}
    }

    @Render('admin/images')
    @Get('panel/images')
    async getImagesControlPanel(){
        return {msg:'s'}
    }


}
