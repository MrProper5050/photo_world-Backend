import { Controller, Get, Param, Post, Render, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from '../user.service';
import * as jwt from 'jsonwebtoken'
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from "./storage.config"
import {User} from '../user.model'
import config from '../../config'

@Controller('profile')
export class ProfileController {
    constructor(private readonly userSevice: UserService){}


    @Get()
    @Render('profile')
    async getProfile(@Req() req:any) {
        const token = req.signedCookies['access_token'];
        // console.log('===token:',token)
        const decoded = jwt.verify(token, config.jwt_s)
        // console.log('===decoded:',decoded)
        const userId = decoded.data.id
        // console.log('===userId:',userId)
        const user = await this.userSevice.findOne(userId)
        // console.log('===user:',user)
        if(user.images.length == 0){
            return {ID: user.id, name: user.name, noImages: 'No Images. Upload your first photo!', isMy:true}
        }
        return {ID: user.id, name: user.name, images: user.images, isMy:true}
    }

    @Get(':id')
    @Render('profile')
    async getProfileById(@Param('id') id:string, @Req() req:any) {
        const token = req.signedCookies['access_token'];
        const decoded = jwt.verify(token, config.jwt_s)
        const userId = decoded.data.id

        const user = await this.userSevice.findOne(id)

        //if this user is you -> show image input
        if(userId === id){
            if(user.images.length == 0){
                return {ID: user.id, name: user.name, noImages: 'No Images. Upload your first photo!', isMy:true}
            }
            return {ID: user.id, name: user.name, images: user.images, isMy:true}
        }else{
            if(user.images.length == 0){
                return {ID: user.id, name: user.name, noImages: 'No Images. Upload your first photo!'}
            }
            return {ID: user.id, name: user.name, images: user.images}
        }

       
    }


    @Post('/upload')
    @UseInterceptors(FileInterceptor('file', {storage}))
    async uploadImage(@UploadedFile() file, @Req() req){
        const fileName = file.filename
        try {
            // update user images array
            const token = req.signedCookies['access_token'];
            const decoded = await jwt.verify(token, config.jwt_s)
            const userId = decoded.data.id
            const user = await this.userSevice.findOne(userId)
            const images = user.images
            images.unshift(fileName)
            await User.update({images},{where:{id:userId}})
            await this.userSevice.addImage(fileName)

            const date = new Date()
            console.log(`User "${user.name}" upload image`,`[${date.getDay()}/${date.getMonth()}/${date.getFullYear()}]`,`${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`)

            return {message:'upload is successful'}
            

        } catch (e) {

            console.log(e)
            return {message:'UPLOAD ERROR'}
            
        }
       
    }
}
