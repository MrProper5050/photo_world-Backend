import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user.model';
import {UserModule} from '../user.module'
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
    imports:[
        forwardRef(()=>UserModule),
        SequelizeModule.forFeature([User])
        ],
    providers:[ProfileService],
    controllers:[ProfileController]
})
export class ProfileModule {}
