import { User } from 'src/user/user.model';
export declare class IndexService {
    private userModel;
    constructor(userModel: typeof User);
    getAllUserAndTheirLastImage(): Promise<any[]>;
}
