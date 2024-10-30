
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DefaultUser } from "../user.schema";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";


export type UserGoogleDocument = Document & UserGoogle;

@Schema({
  timestamps: true
})
export class UserGoogle extends DefaultUser {

  @Prop()
  @ApiProperty()
  email: string;
}

export const UserGoogleSchema = SchemaFactory.createForClass(UserGoogle);

export type GoogleUserInfo = {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: true;
  hd: string;
}
