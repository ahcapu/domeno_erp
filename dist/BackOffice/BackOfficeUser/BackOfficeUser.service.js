"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackOfficeUserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const class_transformer_1 = require("class-transformer");
const SignIn_dto_1 = require("./SignIn.dto");
const BackOfficeUser_create_dto_1 = require("./BackOfficeUser-create.dto");
const BackOfficeUser_entity_1 = require("./BackOfficeUser.entity");
const server_1 = require("../../server");
const fectory_1 = require("../../Utils/fectory");
const ErrorHandling_1 = require("../../BaseIds/ErrorHandling");
const BackOfficeRole_entity_1 = require("../BackOfficeRole/BackOfficeRole.entity");
const Auth_1 = require("../../auth/Auth");
class BackOfficeUserService {
}
_a = BackOfficeUserService;
BackOfficeUserService.userRepo = server_1.AppDataSource.getRepository(BackOfficeUser_entity_1.BackOfficeUser);
BackOfficeUserService.roleRepo = server_1.AppDataSource.getRepository(BackOfficeRole_entity_1.BackOfficeRole);
BackOfficeUserService.signUp = async (data) => {
    try {
        if (data.password !== data.passwordConfirm) {
            return { message: "Both passwords are not matching" };
        }
        let role = await _a.roleRepo.query("SELECT id FROM back_office_role WHERE id = $1", [data.role_id]);
        if (role.length === 0) {
            return { message: "Role id not found" };
        }
        const dto = (0, class_transformer_1.plainToClass)(BackOfficeUser_create_dto_1.CreateBackOfficeUserDto, data);
        const error = await fectory_1.DomenosUtils.validator(dto);
        if (error)
            return error;
        dto.password = await (0, bcryptjs_1.hash)(dto.password, 10);
        return await BackOfficeUser_entity_1.BackOfficeUser.save(await BackOfficeUser_entity_1.BackOfficeUser.create(dto));
    }
    catch (error) {
        return await ErrorHandling_1.ErrorHandling.modeHandling(error);
    }
};
BackOfficeUserService.signIn = async (data) => {
    try {
        const dto = (0, class_transformer_1.plainToClass)(SignIn_dto_1.HiTechSignInDto, data);
        const error = await fectory_1.DomenosUtils.validator(dto);
        if (error)
            return error;
        let user = await _a.userRepo.query("SELECT * FROM back_office_users WHERE email = $1", [dto.email]);
        user = user[0];
        if (!user || !(await (0, bcryptjs_1.compare)(dto.password, user.password))) {
            return { error: "Incorrect email or password" };
        }
        user.token = (0, Auth_1.domenoBackofficeJwt)(user.id);
        return user;
    }
    catch (error) {
        return await ErrorHandling_1.ErrorHandling.modeHandling(error);
    }
};
BackOfficeUserService.getAll = async () => {
    try {
        return await _a.roleRepo.find();
    }
    catch (error) {
        return await ErrorHandling_1.ErrorHandling.modeHandling(error);
    }
};
BackOfficeUserService.getOne = async (id) => {
    try {
        return await _a.roleRepo.findOne({ where: { id } });
    }
    catch (error) {
        return await ErrorHandling_1.ErrorHandling.modeHandling(error);
    }
};
exports.BackOfficeUserService = BackOfficeUserService;
