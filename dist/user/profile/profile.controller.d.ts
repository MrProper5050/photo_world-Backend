import { UserService } from '../user.service';
export declare class ProfileController {
    private readonly userSevice;
    constructor(userSevice: UserService);
    getProfile(req: any): Promise<{
        ID: string;
        name: string;
        noImages: string;
        isMy: boolean;
        images?: undefined;
    } | {
        ID: string;
        name: string;
        images: any;
        isMy: boolean;
        noImages?: undefined;
    }>;
    getProfileById(id: string, req: any): Promise<{
        ID: string;
        name: string;
        noImages: string;
        isMy: boolean;
        images?: undefined;
    } | {
        ID: string;
        name: string;
        images: any;
        isMy: boolean;
        noImages?: undefined;
    } | {
        ID: string;
        name: string;
        noImages: string;
        isMy?: undefined;
        images?: undefined;
    } | {
        ID: string;
        name: string;
        images: any;
        noImages?: undefined;
        isMy?: undefined;
    }>;
    uploadImage(file: any, req: any): Promise<{
        message: string;
    }>;
}
