import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPositive } from "class-validator";
import { BackOfficeUser } from "./BackOfficeUser.entity";
import { BackOfficeRole } from "../BackOfficeRole/BackOfficeRole.entity";

export class UpdateBackOfficeUserDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  id: number;
  // @IsOptional()
  // @IsBoolean()
  // isActive: boolean;

  @IsNotEmpty()
  firstName: string; // *

  @IsNotEmpty()
  lastName: string; // *

  @IsNotEmpty()
  @IsEmail()
  email: string; // *

  @IsNotEmpty()
  password: string; // *

  @IsOptional()
  device_token: string;

  @IsNotEmpty()
  passwordConfirm: string;

  @IsOptional()
  phone: string;
  @IsOptional()
  image: string;
  @IsNotEmpty()
  role: BackOfficeRole;

  @IsNotEmpty()
  updated_by: BackOfficeUser;
}
