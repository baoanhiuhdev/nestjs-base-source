import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from 'src/constants/role';
import { AssignRoles } from 'src/decorators/with-role.decorator';
import { User } from 'src/modules/user/user.schema';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) {

  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const user: User = req.user;
    const role = this.reflector.get(AssignRoles, context.getHandler());
    if (user.role === Roles.SuperAdmin) return true;
    if (user.role === Roles.Admin && (role === Roles.Admin || role === Roles.User)) return true;
    if (user.role === Roles.User && role === Roles.User) return true;
    return false;
  }
}
