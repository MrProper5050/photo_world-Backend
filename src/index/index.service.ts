import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';

@Injectable()
export class IndexService {

    constructor(@InjectModel(User) private userModel: typeof User){}

    async getAllUserAndTheirLastImage(){
        const allUsers = await this.userModel.findAll()

        let myAllUsers = []
        let lastImage = ''

        // console.log(allUsers)
        for (const user of allUsers) {
            lastImage = user.images[0]
            myAllUsers.push({ id:user.id, name: user.name, image: lastImage})
        }
        // console.log(myAllUsers)
        return myAllUsers;
    }

    





}
