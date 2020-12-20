import { Body, Controller, Delete, Get, Param, Post, Render, Req, Res } from '@nestjs/common';
import { createUserDto } from 'src/user/dto/createUser.dto';
import { FindByDto } from 'src/user/dto/findBy.dto';
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
    @Post('/users/reg')
    async registration(@Body() data: createUserDto, @Res() resp){
        // console.log('data:', data )
        const result = await this.adminService.create(data)
        if(result['message'] === "User successfully created") {
            return resp.status(201).json(result)
        }else{
            return resp.status(400).json(result)
        }

        
    }
    @Delete('/users/remove')
    removeUser(@Body() data){
        // console.log('id:',id)
        return this.adminService.remove(data.id)
    }
    @Delete('/users/remove/:id')
    removeUserByIdParamUrl(@Param('id') id: string){
        // console.log('id:',id)
        return this.adminService.remove(id)
    }
    @Post('/images')
    getAllImages(){
        return this.adminService.getAllImages()
    }
    @Delete('/images/remove/:name')
    removeImageByIdParamUrl(@Param('name') name: string){
        // console.log('id:',id)
        return this.adminService.removeImage(name)
    }

}
