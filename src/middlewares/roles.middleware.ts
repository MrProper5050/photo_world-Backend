import { Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'
import { UserService } from '../user/user.service';
import config from '../config'


@Injectable()
export class RolesMiddleware implements NestMiddleware {
  
  constructor(private readonly userService: UserService){}

  async use(req: any, res: any, next: () => void) {

    try {
      const token = req.signedCookies['access_token'];
      const decoded = await jwt.verify(token, config.jwt_s)
      const userId = decoded.data.id
      const user = await this.userService.findOne(userId)
      if( user.role !== 'admin') {
        return res.status(404).render('404')
      }

    } catch (error) {
      //call if jwt is invalid or server couldn't find a user
      return res.status(404).render('404')
    }
    



    next();
  }
}
