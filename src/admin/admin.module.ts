import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RolesMiddleware } from 'src/middlewares/roles.middleware';
import { UserModule } from 'src/user/user.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports:[UserModule],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer.apply(RolesMiddleware).forRoutes('admin')
  }

}
