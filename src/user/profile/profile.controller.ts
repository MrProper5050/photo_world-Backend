import { Controller, Get, Param, Post, Render, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from '../user.service';
import * as jwt from 'jsonwebtoken'
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from "multer";
import { extname } from "path";
import { storage } from "./storage.config"

import {User} from '../user.model'

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
        if(user.images.length == 0){
            return {ID: user.id, name: user.name, noImages: 'No Images. Upload your first photo!'}
        }
        return {ID: user.id, name: user.name, images: user.images}
    }

    @Get(':id')
    getProfileById(@Param('id') id:string) {
        return this.userSevice.findOne(id)
    }


    @Post('/upload')
    @UseInterceptors(FileInterceptor('file', {storage}))
    async uploadImage(@UploadedFile() file, @Req() req){
        const fileName = file.filename
        try {
            // update user images array
            const token = req.signedCookies['access_token'];
            // console.log('1)token:',token)
            const decoded = await jwt.verify(token, process.env.JWT_SECRECT)
            const userId = decoded.data.id
            // console.log('2)userId:',userId)
            const user = await this.userSevice.findOne(userId)
            // console.log('3)user:',user)
            const images = user.images
            // console.log('4)user:',images)
            images.push(fileName)
            // console.log('5)images.push(fileName):',images)

            await User.update({images},{where:{id:userId}})
            
            return {message:'upload is successful'}
            

        } catch (e) {

            console.log(e)
            return {message:'UPLOAD ERROR'}
            
        }
       
    }
}
