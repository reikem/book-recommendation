import { Sequelize } from "sequelize"

const sequelize = new Sequelize("book-recomendation", "postgres", "12345678", {
  host: "localhost",
  dialect: "postgres",
  port: 5433,
  logging: false,
})

export default sequelize