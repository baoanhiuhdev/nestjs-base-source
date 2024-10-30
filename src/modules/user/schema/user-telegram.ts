import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DefaultUser } from "../user.schema";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";


export type UserTelegramDocument = Document & UserTelegram;

@Schema({
  timestamps: true
})
export class UserTelegram extends DefaultUser {

  @Prop()
  @ApiProperty()
  telegramId: number;

  @Prop()
  @ApiProperty()
  firstName?: string;

  @Prop()
  @ApiProperty()
  lastName?: string;

  @Prop()
  @ApiProperty()
  picture?: string;

  @Prop()
  @ApiProperty()
  authDate?: number;

  @Prop()
  @ApiProperty()
  username?: string;
}

export const UserTelegramSchema = SchemaFactory.createForClass(UserTelegram);
