import { Injectable, NestMiddleware } from '@nestjs/common';
const jwt = require('jsonwebtoken')

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {

    if(!req.headers['authorization']) return res.status(401).json({message:'Forbidden'})

    const token = req.headers['authorization'].split(' ')[1]; //Bearer <token>

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRECT)

      next();
    } catch (e) {
      //called if token is invalid
      // console.log(e)
      return res.status(402).json({message:'Token error'})
    }

    
  }
}
