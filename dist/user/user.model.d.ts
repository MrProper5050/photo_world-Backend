import { Model } from 'sequelize-typescript';
export declare class User extends Model<User> {
    id: string;
    name: string;
    password: string;
    images: any;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}
