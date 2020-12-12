import { Controller, Get, Param, Post, Render, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from '../user.service';
import * as jwt from 'jsonwebtoken'
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from "multer";
import { extname } from "path";
import { storage } from "./storage.config"

@Controller('profile')
export class ProfileController {
    constructor(private readonly userSevice: UserService){}


    @Get()
    @Render('profile')
    async getProfile(@Req() req:any) {
        const token = req.signedCookies['access_token'];
        const decoded = jwt.verify(token, process.env.JWT_SECRECT)
        // console.log('===decoded:',decoded)
        const userId = decoded.data.id
        const user = await this.userSevice.findOne(userId)
        return {ID: user.id, name: user.name}
    }

    @Get(':id')
    getProfileById(@Param('id') id:string) {
        return this.userSevice.findOne(id)
    }


    @Post('/upload')
    @UseInterceptors(FileInterceptor('file', {storage}))
    uploadImage(@UploadedFile() file){

        
        console.log('file:',file)
        return file
    }
}
