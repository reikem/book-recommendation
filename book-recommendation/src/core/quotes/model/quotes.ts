import { Book } from "@/core/books/model/book";
import { User } from "@/core/users/model/user";
import { Column, DataType, Default, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName:"quotes",
    comment:"Citas destacadas de libros",
    timestamps:false
})
export class Quotes extends Model <Quotes> {
    @PrimaryKey
    @Default    (DataType.UUIDV4)
    @Column(DataType.UUID)
    id!:string;

    @ForeignKey(()=>Book)
    @Column(DataType.UUID)
    book_id!:string;

    @ForeignKey(()=>User)
    @Column(DataType.UUID)
    user_id!:string;

    @Column(DataType.TEXT)
    quote_text!:string;

    @Column(DataType.STRING)
    character!:string;

    @Column(DataType.STRING)
    page_number?:string;

    @Column(DataType.TEXT)
    notes?:string;

    @Default(DataType.NOW)
    @Column(DataType.DATE)
    created_at!:Date;

    @HasMany(()=>Book)
    books!:Book[];

    @HasMany(()=>User)
    users!:User[];
}