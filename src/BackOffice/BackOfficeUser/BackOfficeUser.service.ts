import { compare, hash } from "bcryptjs";
import { plainToClass } from "class-transformer";
import { HiTechSignInDto } from "./SignIn.dto";
import { CreateBackOfficeUserDto } from "./BackOfficeUser-create.dto";
import { BackOfficeUser } from "./BackOfficeUser.entity";
import { AppDataSource } from "../../server";
import { DomenosUtils } from "../../Utils/fectory";
import { ErrorHandling } from "../../BaseIds/ErrorHandling";
import { BackOfficeRole } from "../BackOfficeRole/BackOfficeRole.entity";
import { domenoBackofficeJwt } from "../../auth/Auth";

export class BackOfficeUserService {
  private static userRepo = AppDataSource.getRepository(BackOfficeUser);
  private static roleRepo = AppDataSource.getRepository(BackOfficeRole);
  static signUp = async (data: CreateBackOfficeUserDto) => {
    try {
      if (data.password !== data.passwordConfirm) {
        return { message: "Both passwords are not matching" };
      }

      let role = await this.roleRepo.query(
        "SELECT id FROM back_office_role WHERE id = $1",
        [data.role_id]
      );

      if (role.length === 0) {
        return { message: "Role id not found" };
      }

      const dto = plainToClass(CreateBackOfficeUserDto, data);

      const error = await DomenosUtils.validator(dto);
      if (error) return error;

      dto.password = await hash(dto.password, 10);

      return await BackOfficeUser.save(await BackOfficeUser.create(dto));
    } catch (error) {
      return await ErrorHandling.modeHandling(error);
    }
  };

  static signIn = async (data: HiTechSignInDto) => {
    try {
      const dto = plainToClass(HiTechSignInDto, data);
      const error = await DomenosUtils.validator(dto);
      if (error) return error;

      let user = await this.userRepo.query(
        "SELECT * FROM back_office_users WHERE email = $1",
        [dto.email]
      );

      user = user[0];

      if (!user || !(await compare(dto.password, user.password))) {
        return { error: "Incorrect email or password" };
      }
      user.token = domenoBackofficeJwt(user.id as any);
      
      return user;
    } catch (error) {
      return await ErrorHandling.modeHandling(error);
    }
  };

  static getAll = async () => {
    try {
      return await this.roleRepo.find();
    } catch (error) {
      return await ErrorHandling.modeHandling(error);
    }
  };

  static getOne = async (id: number) => {
    try {
      return await this.roleRepo.findOne({ where: { id }});
    } catch (error) {
      return await ErrorHandling.modeHandling(error);
    }
  };
}
