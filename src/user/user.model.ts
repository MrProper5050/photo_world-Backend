
import { Column, Table, Model, PrimaryKey, CreatedAt, UpdatedAt, DataType, AllowNull} from 'sequelize-typescript'



@Table({tableName:'users'})
export class User extends Model<User>{
    @PrimaryKey
    @Column(DataType.STRING)
    id: string;
    
    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column
    password: string;

    
    @Column(DataType.ARRAY(DataType.STRING))
    images

    @Column
    role: string;

    @CreatedAt
    @Column
    createdAt: Date

    @UpdatedAt
    @Column
    updatedAt: Date

    

}