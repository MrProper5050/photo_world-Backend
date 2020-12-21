import { UserService } from '../user.service';
export declare class ProfileService {
    private userService;
    constructor(userService: UserService);
    deleteImageIsMeChecker(token: any, imageName: any): Promise<"ERROR 228" | "userId do not match" | "">;
}
