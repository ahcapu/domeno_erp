import { Application } from "express";
import backOfficeRole from './BackOffice/BackOfficeRole/BackOfficeRole.route';
import backOfficeUser from './BackOffice/BackOfficeUser/BackOfficeUser.route';

export function setup(app: Application) {
  app.use("/api/v1/back-office/roles", backOfficeRole);
  app.use("/api/v1/back-office/users", backOfficeUser);
}
