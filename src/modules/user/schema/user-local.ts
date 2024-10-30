import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DefaultUser } from "../user.schema";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";
import bcrypt from 'bcrypt';


export type UserLocalDocument = Document & UserLocal;

@Schema({
  timestamps: true
})
export class UserLocal extends DefaultUser {

  @Prop({
    unique: true
  })
  @ApiProperty()
  email: string;

  @Prop()
  password: string;

  @ApiProperty()
  @Prop({
    default: false
  })
  emailVerified: boolean;

  @ApiProperty()
  @Prop()
  otp?: string;

  @ApiProperty()
  @Prop()
  otpExpresIn?: number;
}

export const UserLocalSchema = SchemaFactory.createForClass(UserLocal);
UserLocalSchema.pre('save', async function() {
  if (this.password && this.isModified('password')) this.password = bcrypt.hashSync(this.password, 7);
})
