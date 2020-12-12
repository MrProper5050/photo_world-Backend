import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ProfileController } from './profile/profile.controller';
import { AuthController } from './auth/auth.controller';


@Module({
  imports:[SequelizeModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController, ProfileController, AuthController]
})
export class UserModule {}
