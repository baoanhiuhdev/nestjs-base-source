import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserSource } from "src/modules/user/user.schema";

@Injectable()
export class MailGuard implements CanActivate {

  constructor() { }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    if (user.source !== UserSource.local) return true;
    if (!user.emailVerified) {
      throw new BadRequestException("Email is not verified")
    }
    return true;
  }
}
