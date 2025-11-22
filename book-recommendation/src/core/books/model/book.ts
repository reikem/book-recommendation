// src/core/books/model/book.ts
import { DataTypes, Model } from "sequelize"
import { sequelize } from "@/lib/db"

export interface BookAttributes {
  id?: string
  title: string
  author: string
  genre: string[]
  rating?: number
  description?: string
  cover?: string
  pages?: string
  year?: string
  language?: string
  isbn?: string
  publisher?: string
  content?: string
  file_path?: string
  file_size?: string
  file_type?: string
  uploaded_by?: string
  is_blocked?: boolean
  blocked_reason?: string
  blocked_at?: Date
  blocked_by?: string
  createdAt?: Date
  updatedAt?: Date
}

export class Book extends Model<BookAttributes> implements BookAttributes {
  declare id?: string
  declare title: string
  declare author: string
  declare genre: string[]
  declare rating?: number
  declare description?: string
  declare cover?: string
  declare pages?: string
  declare year?: string
  declare language?: string
  declare isbn?: string
  declare publisher?: string
  declare content?: string
  declare file_path?: string
  declare file_size?: string
  declare file_type?: string
  declare uploaded_by?: string
  declare is_blocked?: boolean
  declare blocked_reason?: string
  declare blocked_at?: Date
  declare blocked_by?: string
  declare createdAt?: Date
  declare updatedAt?: Date
}

Book.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    genre: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false, defaultValue: [] },
    rating: { type: DataTypes.DECIMAL(3, 1), defaultValue: 0.0 },
    description: DataTypes.TEXT,
    cover: DataTypes.TEXT,
    pages: DataTypes.STRING,
    year: DataTypes.STRING,
    language: DataTypes.STRING,
    isbn: DataTypes.STRING,
    publisher: DataTypes.STRING,
    content: DataTypes.TEXT,
    file_path: DataTypes.STRING,
    file_size: DataTypes.STRING,
    file_type: DataTypes.STRING,
    uploaded_by: DataTypes.UUID,
    is_blocked: { type: DataTypes.BOOLEAN, defaultValue: false },
    blocked_reason: DataTypes.STRING,
    blocked_at: DataTypes.DATE,
    blocked_by: DataTypes.UUID
  },
  {
    sequelize,
    tableName: "books",
    timestamps: true
  }
)
