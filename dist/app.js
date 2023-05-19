"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const server_1 = require("./server");
const setup_1 = require("./setup");
dotenv_1.default.config({ path: "./config/.env" });
const app = (0, express_1.default)();
const port = process.env.PORT;
server_1.AppDataSource.initialize()
    .then(async () => {
    if (process.env.MODE === "development") {
        app.use((0, morgan_1.default)("dev"));
    }
    app.use((0, cors_1.default)());
    app.use(express_1.default.json({ limit: "50mb" }));
    app.use(express_1.default.urlencoded({ extended: true, limit: "50mb" }));
    (0, setup_1.setup)(app);
    console.log("Database is connected");
    app.listen(port, () => {
        console.log(`server running on port ${port}`);
    });
})
    .catch((err) => {
    console.log("Error while connecting database", err);
});
