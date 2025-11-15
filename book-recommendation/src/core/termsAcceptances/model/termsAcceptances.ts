import { Book } from "@/core/books/model/book";
import { User } from "@/core/users/model/user";
import { Column, DataType, Default, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName:"terms_acceptances",
    comment:"Aceptaciones de términos y condiciones por parte de los usuarios",
    timestamps:false
})
export class TermsAcceptances extends Model <TermsAcceptances> {
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
    
    @Default(DataType.NOW)
    @Column(DataType.DATE)
    accepted_at!:Date;

    @Column (DataType.STRING)
    ip_address!:string;

    @Column (DataType.STRING)
    user_agent!:string;

    @Column (DataType.STRING)
    terms_version!:string;

    @HasMany(()=>User)
    users!:User[];

    @HasMany(()=>Book)
    books!:Book[];

}