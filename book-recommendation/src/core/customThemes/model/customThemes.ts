import { User } from "@/core/users/model/user";
import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName:"custom_themes",
    comment:"Temas personalizados creados por los usuarios",
})
export class CustomTheme extends Model<CustomTheme> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id!:string;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.UUID)
    user_id!:string;

    @AllowNull(false)
    @Column(DataType.STRING)
    name!:string;

    @AllowNull(false)
    @Column(DataType.JSONB)
    colors!:Record<string, string>;

    @Default(false)
    @Column(DataType.BOOLEAN)
    is_active!:boolean;

    @Default(DataType.NOW)
    @Column(DataType.DATE)
    created_at!:Date;

    @BelongsTo(()=>User)
    user!:User;


}