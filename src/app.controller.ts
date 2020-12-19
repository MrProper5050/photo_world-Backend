import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // @Render('index')
  // async showIndexPage(){
  //   //get all users and their last image
  //   const allUsers = await this.appService.findAll()
  //   console.log('allUsers:', allUsers)

  //   return {message: 'Hello'}
  // }
}
