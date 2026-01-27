import { Book } from "@/core/books/model/book";
import { Column, DataType, Default, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName:"related_documents",
    comment:"Documentos relacionados con libros",
    timestamps:false
})
export class RelatedDocument extends Model <RelatedDocument> {

    @PrimaryKey
    @Default    (DataType.UUIDV4)
    @Column(DataType.UUID)
    id!:string;

    @ForeignKey (()=>Book)
    @Column(DataType.UUID)
    book_id!:string;

    @Column(DataType.STRING)
    title!:string;
    
    @Column(DataType.STRING)
    description?:string;

    @Column(DataType.STRING)
    file_path!:string;

    @Column(DataType.STRING)
    file_type!:string;

    @Column(DataType.BIGINT)
    file_size!:number;

    @Default(DataType.NOW)
    @Column(DataType.DATE)
    uploaded_at!:Date;

    @Default(DataType.NOW)
    @Column(DataType.DATE)
    created_at!:Date;

    @HasMany(()=>Book)
    books!:Book[];



}
