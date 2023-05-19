"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackOfficeRoleService = void 0;
const class_transformer_1 = require("class-transformer");
const BackOfficeRole_entity_1 = require("./BackOfficeRole.entity");
const ErrorHandling_1 = require("../../BaseIds/ErrorHandling");
const server_1 = require("../../server");
const BackOfficeRole_create_dto_1 = require("./BackOfficeRole-create.dto");
const fectory_1 = require("../../Utils/fectory");
class BackOfficeRoleService {
}
_a = BackOfficeRoleService;
BackOfficeRoleService.roleRepo = server_1.AppDataSource.getRepository(BackOfficeRole_entity_1.BackOfficeRole);
BackOfficeRoleService.add = async (data) => {
    try {
        const dto = (0, class_transformer_1.plainToClass)(BackOfficeRole_create_dto_1.CreateBackOfficeRoleDto, data);
        const error = await fectory_1.DomenosUtils.validator(dto);
        if (error)
            return error;
        let role = await _a.roleRepo.query("SELECT id FROM back_office_role WHERE role = $1", [dto.role]);
        if (role.length !== 0) {
            return { error: "role already exists" };
        }
        let backofficerole = new BackOfficeRole_entity_1.BackOfficeRole();
        Object.assign(backofficerole, dto);
        return await _a.roleRepo.save(backofficerole);
    }
    catch (error) {
        return await ErrorHandling_1.ErrorHandling.modeHandling(error);
    }
};
BackOfficeRoleService.getAll = async () => {
    try {
        return await _a.roleRepo.query("SELECT * FROM back_office_role");
    }
    catch (error) {
        return await ErrorHandling_1.ErrorHandling.modeHandling(error);
    }
};
BackOfficeRoleService.getOne = async (id) => {
    try {
        return await _a.roleRepo.query("SELECT * FROM back_office_role WHERE id = $1", [id]);
    }
    catch (error) {
        return await ErrorHandling_1.ErrorHandling.modeHandling(error);
    }
};
exports.BackOfficeRoleService = BackOfficeRoleService;
