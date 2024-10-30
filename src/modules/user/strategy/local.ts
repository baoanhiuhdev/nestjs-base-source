import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import bcrypt from 'bcrypt';
import { InjectModel } from "@nestjs/mongoose";
import { UserLocal, UserLocalDocument } from "../user.schema";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {

  constructor(
    @InjectModel(UserLocal.name)
    private userLocalModel: Model<UserLocalDocument>,
    private jwtService: JwtService
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {

    const user = await this.userLocalModel.findOne({ email: email });
    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const { password: _, otp: __, ...payload } = user.toObject();

    const accessToken = this.jwtService.sign(payload);
    return { accessToken }
  }
}
