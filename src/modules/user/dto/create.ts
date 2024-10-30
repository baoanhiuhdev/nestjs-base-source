import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";
import { User } from "../user.schema";

export class CreateUserDto {
	@ApiProperty()
	@IsString()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsString()
	password: string;
}

export class CreateUserResponse extends User {
	@ApiProperty()
	accessToken: string;
}
