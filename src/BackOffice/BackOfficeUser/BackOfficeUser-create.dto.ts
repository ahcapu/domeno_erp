import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { BackOfficeUser } from "./BackOfficeUser.entity";
import { BackOfficeRole } from "../BackOfficeRole/BackOfficeRole.entity";

export class CreateBackOfficeUserDto {
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
  
  @IsOptional()
  device_token: string;
  
  @IsNotEmpty()
  password: string; // *

  @IsNotEmpty()
  passwordConfirm: string;

  @IsOptional()
  phone: string;
  @IsOptional()
  image: string;
  @IsNotEmpty()
  role_id: BackOfficeRole;

  @IsNotEmpty()
  created_by: BackOfficeUser;
}
