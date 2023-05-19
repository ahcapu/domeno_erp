import { Router } from "express";
import { BackOfficeUserController } from "../BackOfficeUser/BackOfficeUser.controller";

import { BackOfficeRoleController } from "./BackOfficeRole.controller";

const router = Router();

router.post("/", BackOfficeUserController.protect, BackOfficeRoleController.add);
router.get("/", BackOfficeUserController.protect, BackOfficeRoleController.getAll);
router.get("/:id", BackOfficeUserController.protect, BackOfficeRoleController.getOne);

export default router;
