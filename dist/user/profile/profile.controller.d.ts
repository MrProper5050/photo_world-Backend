import { UserService } from '../user.service';
import { DeleteImageDto } from '../dto/deleteImage.dto';
import { ProfileService } from './profile.service';
export declare class ProfileController {
    private readonly userSevice;
    private readonly profileService;
    constructor(userSevice: UserService, profileService: ProfileService);
    getProfile(req: any, res: any): Promise<any>;
    getProfileById(id: string, req: any, res: any): Promise<any>;
    uploadImage(file: any, req: any, res: any): Promise<any>;
    deleteImage(data: DeleteImageDto, req: any, res: any): Promise<any>;
}
