import { Sequelize } from "sequelize"

const DB_NAME = process.env.DB_NAME || "book-recomendation"
const DB_USER = process.env.DB_USER || "postgres"
const DB_PASSWORD = process.env.DB_PASSWORD || "12345678"
const DB_HOST = process.env.DB_HOST || "localhost"

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "postgres",
    logging: false, // Cambia a console.log si quieres ver los queries
    pool: {
        max: 10,
        min: 1,
        acquire: 30000,
        idle: 10000,
    },
})

// Valida conexión una vez (solo en servidor)
export async function initDB() {
    try {
        await sequelize.authenticate()
        console.log("🔥 Conexión a PostgreSQL establecida.")
    } catch (error) {
        console.error("❌ Error conectando a PostgreSQL:", error)
    }
}
