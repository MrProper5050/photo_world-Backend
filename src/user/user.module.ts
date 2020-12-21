import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthController } from './auth/auth.controller';
import { RolesMiddleware } from '../middlewares/roles.middleware';
import { Image } from './images.model';
import { ProfileModule } from './profile/profile.module';


@Module({
  imports:[SequelizeModule.forFeature([User, Image]), ProfileModule],
  providers: [UserService],
  controllers: [UserController, AuthController],
  exports: [UserService]
})
export class UserModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer.apply(RolesMiddleware).forRoutes('admin', 'api/user/remove')
  }
}
