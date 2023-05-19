import { IsNotEmpty, IsOptional } from "class-validator";
import { BackOfficeUser } from "../BackOfficeUser/BackOfficeUser.entity";

export class CreateBackOfficeRoleDto {
  @IsOptional()
  create_by?: BackOfficeUser;
  
  @IsNotEmpty()
  role: string;
}
