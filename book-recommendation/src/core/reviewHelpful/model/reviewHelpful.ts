import { Review } from "@/core/reviews/model/review";
import { User } from "@/core/users/model/user";
import { Column, DataType, Default, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName:"review_helpful",
    comment:"Tabla que registra las valoraciones de utilidad de las reseñas por parte de los usuarios",
    timestamps:false
})
export class    ReviewHelpful extends Model <ReviewHelpful> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id!:string;

    @ForeignKey(()=>Review)
    @Column(DataType.UUID)
    review_id!:string;

    @ForeignKey(()=>User)       
    @Column(DataType.UUID)
    user_id!:string;

    @Default(DataType.NOW)
    @Column(DataType.DATE)
    created_at!:Date;

    @HasMany(()=>Review)
    reviews!:Review[];

    @HasMany(()=>User)
    users!:User[];




    
}
