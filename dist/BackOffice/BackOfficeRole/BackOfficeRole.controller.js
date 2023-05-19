"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackOfficeRoleController = void 0;
const BackOfficeRole_entity_1 = require("./BackOfficeRole.entity");
const BackOfficeRole_service_1 = require("./BackOfficeRole.service");
class BackOfficeRoleController {
}
_a = BackOfficeRoleController;
BackOfficeRoleController.add = async (req, res) => {
    try {
        let user = req.user.id;
        const data = req.body;
        data.create_by = user;
        const result = await BackOfficeRole_service_1.BackOfficeRoleService.add(data);
        if (!(result instanceof BackOfficeRole_entity_1.BackOfficeRole)) {
            return res.status(400).json({ status: 400, error: result });
        }
        return res.status(201).json({ status: 201, data: result });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
BackOfficeRoleController.getAll = async (req, res) => {
    try {
        const result = await BackOfficeRole_service_1.BackOfficeRoleService.getAll();
        return res.status(200).json({ status: 200, data: result });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
BackOfficeRoleController.getOne = async (req, res) => {
    try {
        const result = await BackOfficeRole_service_1.BackOfficeRoleService.getOne(req.params.id);
        return res.status(200).json({ status: 200, data: result[0] });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
exports.BackOfficeRoleController = BackOfficeRoleController;
