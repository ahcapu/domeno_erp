"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BackOfficeUser_controller_1 = require("../BackOfficeUser/BackOfficeUser.controller");
const BackOfficeRole_controller_1 = require("./BackOfficeRole.controller");
const router = (0, express_1.Router)();
router.post("/", BackOfficeUser_controller_1.BackOfficeUserController.protect, BackOfficeRole_controller_1.BackOfficeRoleController.add);
router.get("/", BackOfficeUser_controller_1.BackOfficeUserController.protect, BackOfficeRole_controller_1.BackOfficeRoleController.getAll);
router.get("/:id", BackOfficeUser_controller_1.BackOfficeUserController.protect, BackOfficeRole_controller_1.BackOfficeRoleController.getOne);
exports.default = router;
