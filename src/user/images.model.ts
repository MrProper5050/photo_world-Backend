
import { Column, Table, Model, AllowNull} from 'sequelize-typescript'



@Table({tableName:'images'})
export class Image extends Model<Image>{
    
    @AllowNull(false)
    @Column
    name: string;


}