import { NestMiddleware } from '@nestjs/common';
import { UserService } from '../user/user.service';
export declare class RolesMiddleware implements NestMiddleware {
    private readonly userService;
    constructor(userService: UserService);
    use(req: any, res: any, next: () => void): Promise<any>;
}
