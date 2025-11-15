import { User } from "@/core/users/model/user";
import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";

@Table({
    tableName:"reading_statistics",
    comment:"Estadísticas de lectura de los usuarios",
    timestamps:false
})
export class ReadingStatistics extends Model <ReadingStatistics> {    @Column({
        primaryKey:true,
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4
    })
    id!:string;

    @ForeignKey(()=>User)
    @Column({
        type:DataType.UUID,
        allowNull:false
    })
    user_id!:string;

    @Column({
        type:DataType.DATEONLY,
        allowNull:false
    })
    date!:string;

    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    book_read!:number;

    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    page_read!:number;

    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    reading_time!:number;

    @HasMany(()=>User)
    users!:User[];
    

}