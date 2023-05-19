"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackOfficeUserController = void 0;
const bcryptjs_1 = require("bcryptjs");
const BackOfficeUser_entity_1 = require("./BackOfficeUser.entity");
const BackOfficeUser_service_1 = require("./BackOfficeUser.service");
const server_1 = require("../../server");
const Auth_1 = require("../../auth/Auth");
class BackOfficeUserController {
}
_a = BackOfficeUserController;
BackOfficeUserController.first = async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(201).json({ status: 400, error: "error" });
        }
        let now = await server_1.AppDataSource.getRepository(BackOfficeUser_entity_1.BackOfficeUser).query(`select to_char(now(), 'YYYY-MM-DD') as now`);
        now = now[0].now;
        if (req.body.name !== `${process.env.JWT_SECRET}+${now}`) {
            return res.status(400).json({ status: 400, error: "error" });
        }
        let user = await server_1.AppDataSource.getRepository(BackOfficeUser_entity_1.BackOfficeUser).find();
        if (user.length) {
            return res.status(400).json({ status: 400, error: "error" });
        }
        let password = await (0, bcryptjs_1.hash)(`${process.env.JWT_SECRET}-${now}`, 10);
        await server_1.AppDataSource.getRepository(BackOfficeUser_entity_1.BackOfficeUser).query(`INSERT INTO back_office_users ("firstName", "lastName", email, password)
        VALUES('administrator', 'administrator', 'administrator', '${password}')`);
        return res.status(201).json({ status: 201, data: "result" });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
BackOfficeUserController.signUp = async (req, res) => {
    try {
        const data = req.body;
        data.created_by = req.user.id;
        const result = await BackOfficeUser_service_1.BackOfficeUserService.signUp(data);
        if (!(result instanceof BackOfficeUser_entity_1.BackOfficeUser)) {
            return res.status(201).json({ status: 400, error: result });
        }
        let adminstrator = await server_1.AppDataSource.getRepository(BackOfficeUser_entity_1.BackOfficeUser).query(`SELECT id FROM back_office_users WHERE "firstName" = 'administrator' AND "lastName" = 'administrator' AND email = 'administrator'`);
        if (adminstrator.length) {
            await BackOfficeUser_entity_1.BackOfficeUser.delete({
                firstName: "administrator",
                lastName: "administrator",
                email: "administrator",
            });
        }
        const { password, ...response } = result;
        return res.status(201).json({ status: 201, data: response });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
BackOfficeUserController.signIn = async (req, res) => {
    try {
        let data = req.body;
        const result = await BackOfficeUser_service_1.BackOfficeUserService.signIn(data);
        const { password, ...response } = result;
        return res.status(201).json({ status: 201, data: response });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
BackOfficeUserController.getAll = async (req, res) => {
    try {
        const result = await BackOfficeUser_service_1.BackOfficeUserService.getAll();
        return res.status(200).json({ status: 200, data: result });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
BackOfficeUserController.getOne = async (req, res) => {
    try {
        const result = await BackOfficeUser_service_1.BackOfficeUserService.getOne(req.params.id);
        return res.status(200).json({ status: 200, data: result });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
BackOfficeUserController.updateDeviceToken = async (req, res) => {
    try {
        const token = req.body.device_token;
        await server_1.AppDataSource.getRepository(BackOfficeUser_entity_1.BackOfficeUser).query(`UPDATE back_office_users SET device_token = $2 WHERE id = $1`, [req.user.id, token]);
        return res
            .status(200)
            .json({ status: 200, data: "Device Token Set Successfully" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
};
BackOfficeUserController.protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            return res.status(401).json({
                status: 401,
                message: "You are not logged in! Please log in to get access.",
            });
        }
        const decoded = await (0, Auth_1.domenoBackofficeVerification)(token);
        let currentUser = await await server_1.AppDataSource.getRepository(BackOfficeUser_entity_1.BackOfficeUser).query('SELECT id, "firstName", "lastName", email FROM back_office_users WHERE id = $1', [decoded.id]);
        currentUser = currentUser[0];
        if (!currentUser) {
            return res.status(401).json({
                status: 401,
                message: "The user belonging to this token does no longer exist.",
            });
        }
        req.user = currentUser;
        next();
    }
    catch (error) {
        return res.status(401).json({
            status: 401,
            message: "The user belonging to this token does no longer exist.",
        });
    }
};
exports.BackOfficeUserController = BackOfficeUserController;
