import { Book } from "@/core/books/model/book";
import { User } from "@/core/users/model/user";
import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName:"moderation_logs",
    comment:"Registros de moderación de contenido",
    timestamps:false
})
export class ModerationLog extends Model <ModerationLog> {
   @PrimaryKey
   @Default(DataType.UUIDV4)
   @Column(DataType.UUID)
   id!:string;

   @ForeignKey(()=>Book)
   @Column(DataType.UUID)
   book_id!:string;

   @ForeignKey(()=>User)
   @Column(DataType.UUID)
   moderator_id!:string;

   @Column(DataType.STRING)
   action!:string;

   @Column(DataType.TEXT)
   reason!:string;

       @AllowNull(false)
       @Column(DataType.JSONB)
       metadata!:Record<string, string>;

    @Default(DataType.NOW)
    @Column(DataType.DATE)
    created_at!:Date;

    @BelongsTo(()=>Book)
    book!:Book;

    @BelongsTo(()=>User)
    moderator!:User;

    @HasMany   (()=>Book)
    books!:Book[];

    @HasMany(()=>User)
    users!:User[];
    

    
}