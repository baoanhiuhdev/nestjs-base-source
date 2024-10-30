import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class LoginLocalUserDto {

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

}

export class LoginResponse {

  @ApiProperty()
  accessToken: string;

}

export class InstrospectGoogleTokenDto {

  @ApiProperty()
  @IsString()
  access_token: string;
}

export class LoginTelegramDto {

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  id: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  first_name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  last_name?: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  auth_date: number;

  @ApiProperty()
  @IsString()
  hash: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  photo_url?: string;
}
