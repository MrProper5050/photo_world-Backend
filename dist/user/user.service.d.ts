import { createUserDto } from './dto/createUser.dto';
import { FindByDto } from './dto/findBy.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { User } from './user.model';
export declare class UserService {
    private userModel;
    constructor(userModel: typeof User);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        images: any;
        registatedIn: Date;
        role: string;
    }>;
    findBy(findByDto: FindByDto): Promise<User[] | {
        message: string;
    }>;
    create(createUserDto: createUserDto): Promise<{
        message: any;
        state: string;
    }>;
    login(loginUserDto: LoginUserDto): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
