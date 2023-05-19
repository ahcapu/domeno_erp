"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "logistics",
    password: "ABCabc@123",
    database: "domenos_erp",
    entities: ["dist/../**/*.entity.js"],
    synchronize: true,
});
