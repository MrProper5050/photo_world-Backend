import { Injectable, NestMiddleware } from '@nestjs/common';
const jwt = require('jsonwebtoken')
import config from '../config'

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  // constructor(private readonly appService: AppService){ }

  use(req: any, res: any, next: () => void) {

    switch (req.originalUrl) {
      case "/auth/login":
        if(req.signedCookies['access_token']) return res.redirect('/')
          next();
        break;
      case "/auth/reg":
        if(req.signedCookies['access_token']) return res.redirect('/')
          next();
        break;
      case "/profile":
        if(!req.signedCookies['access_token']) return res.redirect('/')

        const token = req.signedCookies['access_token']

        try {
          const decoded = jwt.verify(token, config.jwt_s)
          next();
        } catch (e) {
          // called if token is invalid
          return res.redirect('/')
        }
      break;
      default:
        next()
        break;
    }
    
  }
}
