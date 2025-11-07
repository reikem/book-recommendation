import { Sequelize } from "sequelize-typescript";
import { Book } from "../books/model/book";
import { User } from "../users/model/user";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5433,
  username: "postgres",
  password: "12345678",
  database: "book-recomendation",
  models: [Book, User],
  logging: console.log, // Cambia a false para silenciar logs
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a la base de datos establecida correctamente.");

    // sincroniza solo si quieres crear tablas automáticamente
    // await sequelize.sync({ alter: true });

    const tables = await sequelize.showAllSchemas({ });
    console.log("📚 Tablas encontradas:", tables);
  } catch (error) {
    console.error("❌ Error al conectar a la base de datos:", error);
  } finally {
    await sequelize.close();
  }
}

testConnection();