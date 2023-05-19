import { IsEmail, IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { BackOfficeUser } from "../BackOfficeUser/BackOfficeUser.entity";

export class UpdateBackOfficeRoleDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  id: number;
  @IsNotEmpty()
  role: string;

  @IsNotEmpty()
  updated_by: BackOfficeUser;
}
