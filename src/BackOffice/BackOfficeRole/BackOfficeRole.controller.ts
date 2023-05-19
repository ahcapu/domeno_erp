import { Request, Response } from "express";
import { CreateBackOfficeRoleDto } from "./BackOfficeRole-create.dto";
import { BackOfficeRole } from "./BackOfficeRole.entity";
import { BackOfficeRoleService } from "./BackOfficeRole.service";
export class BackOfficeRoleController {
  static add = async (req: Request, res: Response) => {
    try {
      let user = req.user.id;
      const data: CreateBackOfficeRoleDto = req.body;
      data.create_by = user;
      
      const result = await BackOfficeRoleService.add(data);
      if (!(result instanceof BackOfficeRole)) {
        return res.status(400).json({ status: 400, error: result });
      }

      return res.status(201).json({ status: 201, data: result });
    } catch (error) {
      return res.status(500).json({ error });
    }
  };

  static getAll = async (req: Request, res: Response) => {
    try {
      const result = await BackOfficeRoleService.getAll();
      return res.status(200).json({ status: 200, data: result });
    } catch (error) {
      return res.status(500).json({ error });
    }
  };

  static getOne = async (req: Request, res: Response) => {
    try {
      const result = await BackOfficeRoleService.getOne(req.params.id as any);
      return res.status(200).json({ status: 200, data: result[0] });
    } catch (error) {
      return res.status(500).json({ error });
    }
  };
}
