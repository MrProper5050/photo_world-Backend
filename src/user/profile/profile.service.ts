import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from '../user.service';
import * as jwt from 'jsonwebtoken'
import config from '../../config'
import { Op } from 'sequelize';
@Injectable()
export class ProfileService {


    constructor(@Inject(forwardRef(()=>UserService)) private userService: UserService){}


    async deleteImageIsMeChecker(token, imageName) {
        const decoded = jwt.verify(token, config.jwt_s)
        const userId = decoded.data.id // user id who call deleteImage function
        
        const user = await this.userService.findOneWithParamsObject({
            where:{
                images:{
                    [Op.contains]: [imageName]
                }
            }
        })
        if (!user){ return 'ERROR 228' }

        

        if(user.id !== userId) return 'userId do not match'
        return ''
    }

}
