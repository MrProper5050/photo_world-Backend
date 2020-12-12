import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser('sameSite: lax_secret string'))
  app.setBaseViewsDir(join(__dirname,'..','views'))
  app.setViewEngine('hbs');
  await app.listen(3000);
}
bootstrap();
