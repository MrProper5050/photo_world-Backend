import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import config from './config'
import { Logger } from '@nestjs/common';

async function bootstrap() {
  try {
    
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.use(cookieParser(config.cookie_s));
    app.setBaseViewsDir(join(__dirname,'..','views'));
    app.setViewEngine('hbs');
    await app.listen(3000); 
    Logger.log('Server started on 3000 port', 'Bootstrap')
  } catch (error) {
    Logger.log(error, 'Bootstrap')
  }

}
bootstrap();
