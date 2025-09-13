import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.PG_DB,
  process.env.PG_USER,
  String(process.env.PG_PASSWORD),
  {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT ? parseInt(process.env.PG_PORT) : 5432,
    dialect: "postgres",
    logging: console.log,
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connected successfully.");
  } catch (error) {
    console.error("Unable to connect to PostgreSQL:", error);
  }
};

export default sequelize;
