import { Injectable, NestMiddleware } from '@nestjs/common';
const jwt = require('jsonwebtoken')

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {

    switch (req.originalUrl) {
      case "/auth/login":
        if(req.cookies['access_token']) return res.redirect('/')
        next();
        break;
      case "/auth/reg":
        if(req.cookies['access_token']) return res.redirect('/')
        next();
        break;
      case "/profile":
        if(!req.cookies['access_token']) return res.status(401).json({message:'Unauthorized'})

        const token = req.cookies['access_token']

        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRECT)
          next();
        } catch (e) {
          // called if token is invalid
          return res.status(401).json({message:'Unauthorized'})
        }
        break;
    
      default:
        next();
        break;
    }
    
  }
}
