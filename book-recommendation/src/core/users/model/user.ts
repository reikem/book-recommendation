import { Book } from "@/core/books/model/book";
import {
    Table, Column, Model, DataType, PrimaryKey, Default, AllowNull, Unique, HasMany
  } from "sequelize-typescript";

  
  @Table({
    tableName: "users",
    comment: "Usuarios del sistema con diferentes roles",
  })
  export class User extends Model<User> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id!: string;
  
    @AllowNull(false)
    @Column(DataType.STRING)
    name!: string;
  
    @Unique
    @AllowNull(false)
    @Column(DataType.STRING)
    email!: string;
  
    @AllowNull(false)
    @Column(DataType.STRING)
    passwordHash!: string;
  
    @Column(DataType.TEXT)
    avatar?: string;
  
    @Default("user")
    @Column(DataType.STRING)
    role!: "user" | "reviewer" | "admin";
  
    @Default(true)
    @Column(DataType.BOOLEAN)
    isActive!: boolean;
  
    @Default(DataType.NOW)
    @Column(DataType.DATE)
    createdAt!: Date;
  
    @Default(DataType.NOW)
    @Column(DataType.DATE)
    updatedAt!: Date;
  
    @Column(DataType.DATE)
    lastLogin?: Date;
  
    @HasMany(() => Book)
    books!: Book[];
  }
  