import { Controller, Get, Inject, Render, Req } from '@nestjs/common';
import { IndexService } from './index.service';
import * as jwt from 'jsonwebtoken'

@Controller()
export class IndexController {

    constructor(private readonly indexService: IndexService ){}

    @Get()
    @Render('index')
    async getIndexPageAndUsers(@Req()req: any){
        try {
            const token = req.signedCookies['access_token'];
            const decoded = jwt.verify(token, process.env.JWT_SECRECT)
            
            return {users: await this.indexService.getAllUserAndTheirLastImage(), isAuth:true}
        } catch (e) {
            return {users: await this.indexService.getAllUserAndTheirLastImage()}
        }
        
    }

}
