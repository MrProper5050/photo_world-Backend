import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {SequelizeModule} from '@nestjs/sequelize'
import { AuthMiddleware } from './middlewares/auth.middleware';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { IndexModule } from './index/index.module';
import { AdminModule } from './admin/admin.module';



@Module({
  imports: [
    UserModule,
    ServeStaticModule.forRoot({
      rootPath:join(__dirname,'..','client')
    }),
    SequelizeModule.forRoot({
      dialect:'postgres',
      host:'localhost',
      port: 5432,
      username:'postgres',
      password:'1234',
      database:'photo_world',
      autoLoadModels: true,
      synchronize:true,
      logging:false
    }),
    IndexModule,
    AdminModule
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer.apply(AuthMiddleware).forRoutes('profile', 'auth/login', 'auth/reg')
    
  }
}
