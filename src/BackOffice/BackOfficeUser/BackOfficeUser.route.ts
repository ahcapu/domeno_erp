import { Router } from "express";

import { BackOfficeUserController } from "./BackOfficeUser.controller";

const router = Router();

router.post("/first", BackOfficeUserController.first);

router.post("/signin", BackOfficeUserController.signIn);

router.use(BackOfficeUserController.protect);

router.patch("/update-device-token", BackOfficeUserController.updateDeviceToken);
router.post("/signup", BackOfficeUserController.signUp);
router.get("/", BackOfficeUserController.getAll);
router.get("/:id", BackOfficeUserController.getOne);

export default router;
