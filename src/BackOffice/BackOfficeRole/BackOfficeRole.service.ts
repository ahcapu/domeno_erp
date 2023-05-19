import { plainToClass } from "class-transformer";
import { BackOfficeRole } from "./BackOfficeRole.entity";
import { ErrorHandling } from "../../BaseIds/ErrorHandling";
import { AppDataSource } from "../../server";
import { CreateBackOfficeRoleDto } from "./BackOfficeRole-create.dto";
import { DomenosUtils } from "../../Utils/fectory";

export class BackOfficeRoleService {
  private static roleRepo = AppDataSource.getRepository(BackOfficeRole);
  static add = async (data: CreateBackOfficeRoleDto) => {
    try {
      const dto = plainToClass(CreateBackOfficeRoleDto, data);

      const error = await DomenosUtils.validator(dto);
      if (error) return error;

      let role = await this.roleRepo.query(
        "SELECT id FROM back_office_role WHERE role = $1",
        [dto.role]
      );

      if (role.length !== 0) {
        return { error: "role already exists" };
      }
      let backofficerole = new BackOfficeRole();
      Object.assign(backofficerole, dto);
      return await this.roleRepo.save(backofficerole);
    } catch (error) {
      return await ErrorHandling.modeHandling(error);
    }
  };

  static getAll = async () => {
    try {
      return await this.roleRepo.query(
        "SELECT * FROM back_office_role"
      );
    } catch (error) {
      return await ErrorHandling.modeHandling(error);
    }
  };

  static getOne = async (id: number) => {
    try {
      return await this.roleRepo.query(
        "SELECT * FROM back_office_role WHERE id = $1",
        [id]
      );
    } catch (error) {
      return await ErrorHandling.modeHandling(error);
    }
  };
}
