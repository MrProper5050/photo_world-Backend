import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';
import { IndexController } from './index.controller';
import { IndexService } from './index.service';

@Module({
  imports:[SequelizeModule.forFeature([User])],
  controllers: [IndexController],
  providers: [IndexService]
})
export class IndexModule {}
