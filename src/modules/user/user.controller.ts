import { Body, Controller, Query, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { DefaultDelete, DefaultGet, DefaultPost, DefaultPut } from "src/base/method";
import { User } from "./user.schema";
import { LoginResponse, LoginTelegramDto } from "./dto/login";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { PaginationResponseFactory } from "src/utils/response";
import { GetAllUserQuery } from "./dto/get";
import { Roles } from "src/constants/role";
import { DeleteUserQuery } from "./dto/delete";
import { UpdateRoleDto, UpdateUserDto } from "./dto/update";
import { UserInfo, WithAuthorize } from "src/decorators";
import { WithRole } from "src/decorators/with-role.decorator";

@Controller("user")
@ApiTags("User")
export class UserController {
	constructor(private userService: UserService) {}

	@DefaultGet("/me", User)
	@WithAuthorize()
	@ApiOperation({
		summary: "Use this api to get user profile",
	})
	async getUserInfo(@UserInfo() user: User) {
		return this.userService.findById(user._id, { password: 0 });
	}

	@DefaultPut("/me", User)
	@WithRole(Roles.User)
	@ApiOperation({
		summary: "Use this api to update profile",
	})
	async updateProfile(@UserInfo() user: User, @Body() body: UpdateUserDto) {
		return this.userService.findOneAndUpdate({ _id: user._id }, body, { new: true });
	}

	@DefaultPost("/telegram/token", LoginResponse)
	@UseGuards(AuthGuard("telegram"))
	@ApiOperation({
		summary: "Use this api to verify telegram login data",
	})
	async telegramInstropectToken(@Req() req: any, @Body() body: LoginTelegramDto) {
		return req.user;
	}

	@DefaultGet("", PaginationResponseFactory(User))
	@WithRole(Roles.Admin)
	@ApiOperation({
		summary: "Use this api to get all user",
	})
	async getAll(@Query() query: GetAllUserQuery) {
		return this.userService.getAll(query);
	}

	@DefaultDelete("", User)
	@WithRole(Roles.Admin)
	@ApiOperation({
		summary: "Use this api to delete users",
	})
	async remove(@Query() query: DeleteUserQuery) {
		return this.userService.deleteMany(query.userIds);
	}

	@DefaultPut("/update-role", User)
	@WithAuthorize()
	@ApiOperation({
		summary: "Use this api to update role user ",
	})
	async updateRole(@Query() query: UpdateRoleDto, @UserInfo() user: User) {
		return this.userService.updateRole(query, user._id);
	}
}
