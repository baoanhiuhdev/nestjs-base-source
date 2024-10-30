import { applyDecorators, ForbiddenException, UseGuards } from "@nestjs/common";
import { Roles } from "src/constants/role";
import { WithAuthorize } from "./with-authorize";
import { RolesGuard } from "src/guards/role.guard";
import { Reflector } from "@nestjs/core";
import { ApiForbiddenResponse } from "@nestjs/swagger";
import { ForbiddenResourceError } from "src/interceptors/error.interceptors";

export const WithRole = (role: Roles) => {
  return applyDecorators(
    WithAuthorize(),
    AssignRoles(role),
    UseGuards(RolesGuard),
    ApiForbiddenResponse({
      type: ForbiddenResourceError
    })
  )
}

export const AssignRoles = Reflector.createDecorator<Roles>();
