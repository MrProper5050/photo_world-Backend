import { UserService } from '../user.service';
import { DeleteImageDto } from '../dto/deleteImage.dto';
export declare class ProfileController {
    private readonly userSevice;
    constructor(userSevice: UserService);
    getProfile(req: any, res: any): Promise<any>;
    getProfileById(id: string, req: any, res: any): Promise<any>;
    uploadImage(file: any, req: any, res: any): Promise<any>;
    deleteImage(data: DeleteImageDto): Promise<{
        message: string;
    }>;
}
