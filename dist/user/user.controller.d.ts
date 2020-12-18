import { UserService } from './user.service';
import { createUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { FindByDto } from './dto/findBy.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAll(req: any): Promise<import("./user.model").User[]>;
    getBy(findByDto: FindByDto): Promise<import("./user.model").User[] | {
        message: string;
    }>;
    registration(data: createUserDto, resp: any): Promise<any>;
    loginSystem(data: LoginUserDto, res: any): Promise<any>;
    removeUser(data: any): Promise<{
        message: string;
    }>;
    removeUserByIdParamUrl(id: string): Promise<{
        message: string;
    }>;
}
