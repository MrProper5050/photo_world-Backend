import { Body, Controller, Delete, Get, Param, Post, Render, Req } from '@nestjs/common';
import { FindByDto } from 'src/user/dto/findBy.dto';
import { UserService } from 'src/user/user.service';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {

    constructor(private adminService: AdminService){}

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



    @Post('/users')
    async getAllUsers(){
        return await this.adminService.findAll()
    }
    @Post('/users/getBy')
    async getBy(@Body() findByDto: FindByDto){
        return await this.adminService.findBy(findByDto)
    }
    @Delete('/users/remove')
    removeUser(@Body() data){
        // console.log('id:',id)
        return this.adminService.remove(data.id)
    }
    @Delete('/users/remove/:id')
    removeUserByIdParamUrl(@Param('id')id: string){
        // console.log('id:',id)
        return this.adminService.remove(id)
    }
    @Post('/images')
    getAllImages(){
        return this.adminService.getAllImages()
    }
    @Delete('/images/remove/:name')
    removeImageByIdParamUrl(@Param('name')name: string){
        // console.log('id:',id)
        return this.adminService.removeImage(name)
    }

}
