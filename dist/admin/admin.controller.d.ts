import { createUserDto } from 'src/user/dto/createUser.dto';
import { FindByDto } from 'src/user/dto/findBy.dto';
import { AdminService } from './admin.service';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    getAdminPanel(): Promise<{
        msg: string;
    }>;
    getUsersControlPanel(): Promise<{
        msg: string;
    }>;
    getImagesControlPanel(): Promise<{
        msg: string;
    }>;
    getAllUsers(): Promise<import("../user/user.model").User[]>;
    getBy(findByDto: FindByDto): Promise<import("../user/user.model").User[] | {
        message: string;
    }>;
    registration(data: createUserDto, resp: any): Promise<any>;
    removeUser(data: any): Promise<{
        message: string;
    }>;
    removeUserByIdParamUrl(id: string): Promise<{
        message: string;
    }>;
    getAllImages(): Promise<import("../user/images.model").Image[]>;
    removeImageByIdParamUrl(name: string): Promise<{
        message: string;
    }>;
}
