import { hash } from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import { CreateBackOfficeUserDto } from "./BackOfficeUser-create.dto";
import { BackOfficeUser } from "./BackOfficeUser.entity";
import { BackOfficeUserService } from "./BackOfficeUser.service";
import { HiTechSignInDto } from "./SignIn.dto";
import { AppDataSource } from "../../server";
import { domenoBackofficeVerification } from "../../auth/Auth";
export class BackOfficeUserController {
  static first = async (req: Request, res: Response) => {
    try {
      if (!req.body.name) {
        return res.status(201).json({ status: 400, error: "error" });
      }
      let now = await AppDataSource.getRepository(BackOfficeUser).query(
        `select to_char(now(), 'YYYY-MM-DD') as now`
      );
      now = now[0].now;

      if (req.body.name !== `${process.env.JWT_SECRET}+${now}`) {
        return res.status(400).json({ status: 400, error: "error" });
      }
      let user = await AppDataSource.getRepository(BackOfficeUser).find();

      if (user.length) {
        return res.status(400).json({ status: 400, error: "error" });
      }
      let password = await hash(`${process.env.JWT_SECRET}-${now}`, 10);

      await AppDataSource.getRepository(BackOfficeUser).query(
        `INSERT INTO back_office_users ("firstName", "lastName", email, password)
        VALUES('administrator', 'administrator', 'administrator', '${password}')`
      );

      return res.status(201).json({ status: 201, data: "result" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  };

  static signUp = async (req: Request, res: Response) => {
    try {
      const data: CreateBackOfficeUserDto = req.body;
      data.created_by = req.user.id;
      const result = await BackOfficeUserService.signUp(data);
      if (!(result instanceof BackOfficeUser)) {
        return res.status(201).json({ status: 400, error: result });
      }

      let adminstrator = await AppDataSource.getRepository(BackOfficeUser).query(
        `SELECT id FROM back_office_users WHERE "firstName" = 'administrator' AND "lastName" = 'administrator' AND email = 'administrator'`
      );
      if (adminstrator.length) {
        await BackOfficeUser.delete({
          firstName: "administrator",
          lastName: "administrator",
          email: "administrator",
        });
      }

      const { password, ...response } = result;

      return res.status(201).json({ status: 201, data: response });
    } catch (error) {
      return res.status(500).json({ error });
    }
  };

  static signIn = async (req: Request, res: Response) => {
    try {
      let data: HiTechSignInDto = req.body;
      const result = await BackOfficeUserService.signIn(data);

      const { password, ...response } = result;
      return res.status(201).json({ status: 201, data: response });
    } catch (error) {
      return res.status(500).json({ error });
    }
  };

  static getAll = async (req: Request, res: Response) => {
    try {
      const result = await BackOfficeUserService.getAll();
      return res.status(200).json({ status: 200, data: result });
    } catch (error) {
      return res.status(500).json({ error });
    }
  };

  static getOne = async (req: Request, res: Response) => {
    try {
      const result = await BackOfficeUserService.getOne(req.params.id as any);
      return res.status(200).json({ status: 200, data: result });
    } catch (error) {
      return res.status(500).json({ error });
    }
  };

  static updateDeviceToken = async (req: Request, res: Response) => {
    try {
      const token = req.body.device_token;
      await AppDataSource.getRepository(BackOfficeUser).query(
        `UPDATE back_office_users SET device_token = $2 WHERE id = $1`,
        [req.user.id, token]
      );
      return res
        .status(200)
        .json({ status: 200, data: "Device Token Set Successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };

  static protect = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let token;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }

      if (!token) {
        return res.status(401).json({
          status: 401,
          message: "You are not logged in! Please log in to get access.",
        });
      }
      const decoded: any = await domenoBackofficeVerification(token);

      let currentUser = await await AppDataSource.getRepository(BackOfficeUser).query(
        'SELECT id, "firstName", "lastName", email FROM back_office_users WHERE id = $1',
        [decoded.id]
      );

      currentUser = currentUser[0];

      if (!currentUser) {
        return res.status(401).json({
          status: 401,
          message: "The user belonging to this token does no longer exist.",
        });
      }
      req.user = currentUser;
      next();
    } catch (error) {
      return res.status(401).json({
        status: 401,
        message: "The user belonging to this token does no longer exist.",
      });
    }
  };
}
