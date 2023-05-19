import "reflect-metadata";
import path from "path";
import "reflect-metadata";
import express, { Express } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { AppDataSource } from "./server";
import { setup } from "./setup";
dotenv.config({ path: "./config/.env" });

const app: Express = express();

const port = process.env.PORT;

AppDataSource.initialize()
  .then(async () => {
    if (process.env.MODE === "development") {
      app.use(morgan("dev"));
    }
    app.use(cors());

    app.use(express.json({ limit: "50mb" }));
    app.use(express.urlencoded({ extended: true, limit: "50mb" }));

    setup(app);
    console.log("Database is connected");
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  })
  .catch((err) => {    
    console.log("Error while connecting database", err);
  });
