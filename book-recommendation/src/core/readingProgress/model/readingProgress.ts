import { Book } from "@/core/books/model/book";
import { User } from "@/core/users/model/user";
import { Column, DataType, Default, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName:"reading_progress",
    comment:"Progreso de lectura de los usuarios",
    timestamps:false        

})
export class ReadingProgress extends Model <ReadingProgress> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id!:string;

    @ForeignKey(()=>User)   
    @Column(DataType.UUID)
    user_id!:string;

    @ForeignKey(()=>Book)
    @Column(DataType.UUID)
    book_id!:string;

    @Column(DataType.INTEGER)
    current_page!:number;

    @Default(DataType.NOW)
    @Column(DataType.DATE)
    last_read_at!:Date;

    @Default(DataType.NOW)
    @Column(DataType.DATE)
    started_at!:Date;

    @Column(DataType.DATE)
    finished_at?:Date;

    @Default(0)
    @Column(DataType.INTEGER)
    total_reading_time!:number; // in minutes

    @HasMany(()=>Book)
    books!:Book[];

    @HasMany(()=>User)
    users!:User[];

}