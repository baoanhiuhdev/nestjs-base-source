import { applyDecorators, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiUnauthorizedResponse } from "@nestjs/swagger"
import { AppAuthGuard } from "src/guards/auth.guard"
import { UnauthorizedError } from "src/interceptors/error.interceptors"

export const WithAuthorize = () => {
  return applyDecorators(
    UseGuards(AppAuthGuard),
    ApiUnauthorizedResponse({
      type: UnauthorizedError
    }),
    ApiBearerAuth(),
  )
}
