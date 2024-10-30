import { BadRequestException, Injectable } from "@nestjs/common";
import { User, UserDocument, UserLocal, UserLocalDocument } from "./user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Roles } from "src/constants/role";
import { JwtService } from "@nestjs/jwt";
import { UpdateRoleDto } from "./dto/update";
import { BaseService } from "src/base";

@Injectable()
export class UserService extends BaseService<UserDocument> {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }

  async updateRole(Query: UpdateRoleDto, idUser: Types.ObjectId) {
    const { id, role } = Query;
    let result = await this.findById(idUser);
    if (result?.role === Roles.SuperAdmin) {
      return this.updateOne({ _id: id }, { role: role });
    }
    if (result?.role === Roles.Admin && (role === Roles.User || role === Roles.Admin)) {
      return this.updateOne({ _id: id }, { role: role });
    }
    return new BadRequestException("You don't have permission to do this action");
  }
}
