import { Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'
import { UserService } from '../user/user.service';


@Injectable()
export class RolesMiddleware implements NestMiddleware {
  
  constructor(private readonly userService: UserService){}

  async use(req: any, res: any, next: () => void) {

    try {
      const token = req.signedCookies['access_token'];
      // console.log('token',token)
      const decoded = await jwt.verify(token, process.env.JWT_SECRECT)
      // console.log('decoded',decoded)
      const userId = decoded.data.id
      // console.log('userId',userId)
      const user = await this.userService.findOne(userId)
      // console.log('user',user)
      if( user.role !== 'admin') {
        return res.redirect('/')
      }




      
    } catch (error) {

      console.log(error)
      
    }
    



    next();
  }
}
