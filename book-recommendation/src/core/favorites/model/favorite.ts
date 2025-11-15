import { Book } from "@/core/books/model/book";
import { User } from "@/core/users/model/user";
import { BelongsTo, Column, DataType, Default, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: "favorites",
    comment: "Tabla que almacena los libros favoritos de los usuarios",
    timestamps: false,
})
export class Favorite extends Model<Favorite> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id!: string;

    @ForeignKey(() => User)
    @Column(DataType.UUID)
    user_id!: string;

    @ForeignKey(() => Book)
    @Column(DataType.UUID)
    book_id!: string;

    @Default(DataType.NOW)
    @Column(DataType.DATE)
    created_at!: Date;

    @BelongsTo(() => User)
    user!: User;

    @BelongsTo(() => Book)
    book!: Book;
    
    @HasMany(() => Book)
    books!: Book[];
}
