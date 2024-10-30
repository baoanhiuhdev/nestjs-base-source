import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class VerifyOtpDto {
  @ApiProperty()
  @IsString()
  otp: string;

  @ApiProperty()
  @IsString()
  email: string;
}

export class ResendVerifyDto {
  @ApiProperty()
  @IsString()
  email: string;
}

export class ResetPasswordBody {
  @ApiProperty()
  @IsString()
  otp: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class ResendResetPasswordDto {
  @ApiProperty()
  @IsString()
  email: string;
}
