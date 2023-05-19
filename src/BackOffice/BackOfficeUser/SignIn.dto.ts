import { IsNotEmpty, IsEmail } from "class-validator";

export class HiTechSignInDto {
  @IsNotEmpty()
  email: string; // *

  @IsNotEmpty()
  password: string; // *
}
