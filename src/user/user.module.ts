import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ProfileController } from './profile/profile.controller';
import { AuthController } from './auth/auth.controller';
import { RolesMiddleware } from '../middlewares/roles.middleware';
import { Image } from './images.model';


@Module({
  imports:[SequelizeModule.forFeature([User, Image])],
  providers: [UserService],
  controllers: [UserController, ProfileController, AuthController],
  exports: [UserService]
})
export class UserModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer.apply(RolesMiddleware).forRoutes('admin', 'api/user/remove')
  }
}
