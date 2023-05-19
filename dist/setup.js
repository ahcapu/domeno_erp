"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = void 0;
const BackOfficeRole_route_1 = __importDefault(require("./BackOffice/BackOfficeRole/BackOfficeRole.route"));
const BackOfficeUser_route_1 = __importDefault(require("./BackOffice/BackOfficeUser/BackOfficeUser.route"));
function setup(app) {
    app.use("/api/v1/back-office/roles", BackOfficeRole_route_1.default);
    app.use("/api/v1/back-office/users", BackOfficeUser_route_1.default);
}
exports.setup = setup;
