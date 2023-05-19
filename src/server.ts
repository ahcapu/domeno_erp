import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "logistics",
  password: "ABCabc@123",
  database: "domenos_erp",
  entities: ["dist/../**/*.entity.js"],
  synchronize: true,
});
