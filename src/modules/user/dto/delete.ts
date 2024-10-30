import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class DeleteUserQuery {
  @IsString({
    each: true
  })
  @ApiProperty()
  userIds: Array<string>;
}