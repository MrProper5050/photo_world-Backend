import { UserService } from '../user.service';
export declare class ProfileController {
    private readonly userSevice;
    constructor(userSevice: UserService);
    getProfile(req: any): Promise<{
        ID: any;
        name: any;
        noImages: string;
        isMy: boolean;
        images?: undefined;
    } | {
        ID: any;
        name: any;
        images: any;
        isMy: boolean;
        noImages?: undefined;
    }>;
    getProfileById(id: string, req: any): Promise<{
        ID: any;
        name: any;
        noImages: string;
        isMy: boolean;
        images?: undefined;
    } | {
        ID: any;
        name: any;
        images: any;
        isMy: boolean;
        noImages?: undefined;
    } | {
        ID: any;
        name: any;
        noImages: string;
        isMy?: undefined;
        images?: undefined;
    } | {
        ID: any;
        name: any;
        images: any;
        noImages?: undefined;
        isMy?: undefined;
    }>;
    uploadImage(file: any, req: any): Promise<{
        message: string;
    }>;
}
