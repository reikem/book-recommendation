import { Book } from "@/core/books/model/book";
import { User } from "@/core/users/model/user";
import { Column, DataType, Default, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName:"reviews",
    comment:"Reseñas de libros por parte de los usuarios",
    timestamps:false
})
export class Review extends Model <Review> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id!:string;

    @ForeignKey(()=>Book)
    @Column (DataType.UUID)
    book_id!:string;

    @ForeignKey(()=>User)
    @Column (DataType.UUID)
    user_id!:string;

    @Column(DataType.INTEGER)
    rating!:number;

    @Column(DataType.TEXT)
    text!:string;

    @Default(0)
    @Column(DataType.INTEGER)
    helpfulCount!:number;

    @Default(DataType.NOW)
    @Column(DataType.DATE)
    created_at!:Date;

    @Default(DataType.NOW)
    @Column(DataType.DATE)
    updated_at!:Date;

    @HasMany(()=>Book)
    books!:Book[];

    @HasMany(()=>User)
    users!:User[];

}