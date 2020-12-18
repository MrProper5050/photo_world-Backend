import { IndexService } from './index.service';
export declare class IndexController {
    private readonly indexService;
    constructor(indexService: IndexService);
    getIndexPageAndUsers(req: any): Promise<{
        users: any[];
        isAuth: boolean;
    } | {
        users: any[];
        isAuth?: undefined;
    }>;
}
