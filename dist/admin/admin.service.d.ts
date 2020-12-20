import { createUserDto } from 'src/user/dto/createUser.dto';
import { FindByDto } from 'src/user/dto/findBy.dto';
import { UserService } from 'src/user/user.service';
export declare class AdminService {
    private userService;
    constructor(userService: UserService);
    findAll(): Promise<import("../user/user.model").User[]>;
    findBy(findByDto: FindByDto): Promise<import("../user/user.model").User[] | {
        message: string;
    }>;
    create(createUserDto: createUserDto): Promise<{
        message: any;
        state: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    getAllImages(): Promise<import("../user/images.model").Image[]>;
    removeImage(name: string): Promise<{
        message: string;
    }>;
}
