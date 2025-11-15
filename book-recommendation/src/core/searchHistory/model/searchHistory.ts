import { User } from "@/core/users/model/user";
import { Column, DataType, Default, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName:"search_history",
    comment:"Historial de búsquedas realizadas por los usuarios",
    timestamps:false        
})
export class SearchHistory extends Model<SearchHistory> {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id!:string;

    @ForeignKey(() => User)
    @Column(DataType.UUID)
    user_id!:string;

    @Column(DataType.STRING)
    search_term!:string;

    @Column(DataType.INTEGER)
    results_count!:number;

    @Default(DataType.NOW)
    @Column(DataType.DATE)
    created_at!:Date;

    @HasMany(() => User)
    users!:User[];
}