import { User } from "@/core/users/model/user";
import { Column, DataType, Default, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName:"notifications",
    comment:"Notificaciones para los usuarios",
    timestamps:false
})
export class Notification extends Model <Notification> {
    @PrimaryKey
    @Default    (DataType.UUIDV4)
    @Column(DataType.UUID)
    id!:string;
    
    @ForeignKey(()=>User)
    @Column(DataType.UUID)
    user_id!:string;
    @Column(DataType.STRING)
    type!:string;

    @Column(DataType.STRING)
    title!:string;

    @Column(DataType.TEXT)
    message!:string;

    @Column(DataType.STRING)
    link?:string;

    @Default(false)
    @Column(DataType.BOOLEAN)
    is_read!:boolean;

    @Default(DataType.NOW)
    @Column(DataType.DATE)
    created_at!:Date;

    @HasMany(()=>User)
    users!:User[];
}