import { Body, Controller, Get, Param, Post, Render, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from '../user.service';
import * as jwt from 'jsonwebtoken'
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from "./storage.config"
import {User} from '../user.model'
import config from '../../config'
import * as logger4js from 'log4js'
import { DeleteImageDto } from '../dto/deleteImage.dto';
const logger = logger4js.getLogger()


@Controller('profile')
export class ProfileController {
    constructor(private readonly userSevice: UserService){}


    @Get()
    async getProfile(@Req() req:any, @Res() res:any) {
        const token = req.signedCookies['access_token'];
        const decoded = jwt.verify(token, config.jwt_s)
        const userId = decoded.data.id
        const user = await this.userSevice.findOne(userId)
        if(!user) return res.status(404).render('404')
        if(user.images.length == 0){
            return res.render('profile',{ID: user.id, name: user.name, noImages: 'No Images. Upload your first photo!', isMy:true})
        }
        return res.render('profile',{ID: user.id, name: user.name, images: user.images, isMy:true})
    }

    @Get(':id')
    async getProfileById(@Param('id') id:string, @Req() req:any, @Res() res: any) {
        try {
            const token = req.signedCookies['access_token'];
            const decoded = jwt.verify(token, config.jwt_s)
            const userId = decoded.data.id
            const user = await this.userSevice.findOne(id)

            if(!user) {
                return res.status(404).render('404')
            }
            
                //if this user is you -> show image input
            if(userId === id){
                if(user.images.length == 0){
                    return res.render('profile',{ID: user.id, name: user.name, noImages: 'No Images. Upload your first photo!', isMy:true})
                }
                return res.render('profile',{ID: user.id, name: user.name, images: user.images, isMy:true})
            }else{
                if(user.images.length == 0){
                    return res.render('profile',{ID: user.id, name: user.name, noImages: 'No Images. Upload your first photo!'})
                }
                return res.render('profile',{ID: user.id, name: user.name, images: user.images})
            }
        } catch (e) {
            return res.status(333).redirect('/')
        }
    }


    @Post('/upload')
    @UseInterceptors(FileInterceptor('file', {storage}))
    async uploadImage(@UploadedFile() file, @Req() req, @Res() res: any){
        const fileName = file.filename
        let file_ex = fileName.split('.')[fileName.split('.').length - 1].toLowerCase();
        if(file.size > 10000000)
        {
         return res.status(304).json({message:'file too large(max size 10MB)'})
        }
        if(!(   file_ex === 'png'  ||
                file_ex === 'jpg'  ||
                file_ex === 'jpeg' ||
                file_ex === 'tiff' ||
                file_ex === 'gif'  ||
                file_ex === 'webp' ||
                file_ex === 'svg'
                ))
        {
            return res.status(304).json({message:'file extension is invalid'})
        }

        try {
            // update user images array
            const token = req.signedCookies['access_token'];
            if(!token) return res.status(403).json('FORBIDDEN')
            const decoded = await jwt.verify(token, config.jwt_s)
            const userId = decoded.data.id
            const user = await this.userSevice.findOne(userId)

            let images = user.images
            images.unshift(fileName)

            await User.update({images},{where:{id:userId}})
            await this.userSevice.addImage(fileName)

            logger.debug(`User "${user.name}" upload image`)
            // console.log(`User "${user.name}" upload image`,`[${date.getDay()}/${date.getMonth()}/${date.getFullYear()}]`,`${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`)

            return res.status(202).json({message:'upload is successful'})
            

        } catch (e) {

            console.log(e)
            return res.status(402).json({message:'UPLOAD ERROR'})
            
        }
       
    }

    @Post('/deleteImage')
    async deleteImage(@Body() data: DeleteImageDto){
        
        return this.userSevice.removeImage(data.imageName)
    }
}
