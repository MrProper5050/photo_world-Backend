import { createUserDto } from './dto/createUser.dto';
import { FindByDto } from './dto/findBy.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { User } from './user.model';
import { Image } from './images.model';
export declare class UserService {
    private userModel;
    private imageModel;
    constructor(userModel: typeof User, imageModel: typeof Image);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        images: any;
        registatedIn: Date;
        role: string;
    }>;
    findOneWithParamsObject(param: any): Promise<User>;
    findBy(findByDto: FindByDto): Promise<User[] | {
        message: string;
    }>;
    create(createUserDto: createUserDto): Promise<{
        message: any;
        state: string;
    }>;
    password_login_validate(userObj: any): "OK" | {
        message: string;
        state: string;
    };
    login(loginUserDto: LoginUserDto): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
    getAllImages(): Promise<Image[]>;
    removeImage(imageName: string): Promise<{
        message: string;
    }>;
    addImage(imageName: string): Promise<void>;
}
