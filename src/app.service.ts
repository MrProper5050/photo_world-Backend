import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user/user.model';

@Injectable()
export class AppService {
  
  // constructor(@InjectModel(User) private userModel: typeof User ){}

  // async findAll(): Promise<User[]>{
  //   return this.userModel.findAll();
  // }

}
