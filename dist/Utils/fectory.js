"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomenosUtils = void 0;
const class_validator_1 = require("class-validator");
class DomenosUtils {
}
_a = DomenosUtils;
DomenosUtils.validator = async (dto) => {
    const errors = await (0, class_validator_1.validate)(dto);
    if (errors.length) {
        for (let i = 0; i < errors.length; i++) {
            const element = errors[i];
            return element.constraints;
        }
    }
};
DomenosUtils.parentQuery = async (Model, value) => {
    return await Model.findOne({ where: { value } });
};
DomenosUtils.bodyValidate = (body) => {
    if (body) {
        Object.keys(body).forEach((key) => {
            if (body[key] === "" ||
                body[key] === null ||
                body[key] === undefined ||
                body[key] === "Invalid date") {
                body[key] = null;
            }
        });
    }
};
exports.DomenosUtils = DomenosUtils;
