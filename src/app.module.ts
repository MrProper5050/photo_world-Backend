import { Module } from '@nestjs/common';
import { from } from 'rxjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {SequelizeModule} from '@nestjs/sequelize'

@Module({
  imports: [
    UserModule,
    SequelizeModule.forRoot({
      dialect:'postgres',
      host:'localhost',
      port: 5432,
      username:'postgres',
      password:'1234',
      database:'photo_world',
      autoLoadModels: true,
      synchronize:true,
      logging:true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
