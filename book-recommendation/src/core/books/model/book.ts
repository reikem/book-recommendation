import {
    Table,
    Column,
    Model,
    DataType,
    Default,
    AllowNull,
    ForeignKey,
    BelongsTo,
    PrimaryKey,
  } from "sequelize-typescript"

import { User } from "@/core/users/model/user"
  
  @Table({
    tableName: "books",
    timestamps: false,
    comment: "Catálogo de libros con información completa",
  })
  export class Book extends Model<Book>  {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    
    id!: string
  
    @AllowNull(false)
    @Column(DataType.STRING)
    title!: string
  
    @AllowNull(false)
    @Column(DataType.STRING)
    author!: string
  
    @AllowNull(false)
      @Column(DataType.ARRAY(DataType.STRING))
      genre!: string[]
  
    @Default(0.0)
    @Column(DataType.DECIMAL(3, 1))
    rating!: number
  
    @Column(DataType.TEXT)
    description?: string
  
    @Column(DataType.TEXT)
    cover!: string
  
    @AllowNull(false)
    @Column(DataType.INTEGER)
    pages!: number
  
    @AllowNull(false)
    @Column(DataType.INTEGER)
    year!: number
  
    @Column(DataType.STRING)
    language?: string
  
    @Column(DataType.STRING)
    isbn?: string
  
    @Column(DataType.STRING)
    publisher?: string
  
    @Column(DataType.TEXT)
    content?: string
  
    @Column(DataType.TEXT)
    file_path?: string
  
    @Column(DataType.BIGINT)
    file_size?: number
  
    @Column(DataType.STRING)
    file_type?: string
  
    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.UUID)
    uploaded_by!: string
  
    @BelongsTo(() => User)
    uploader!: User
  
    @Default(false)
    @Column(DataType.BOOLEAN)
    is_blocked!: boolean
  
    @Column(DataType.TEXT)
    block_reason?: string
  
    @Column(DataType.DATE)
    blocked_at?: Date
  
    @Column(DataType.UUID)
    blocked_by?: string
  
    @Column(DataType.DATE)
    created_at?: Date
  
    @Column(DataType.DATE)
    updated_at?: Date
  }
  