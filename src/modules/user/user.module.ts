import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserLocal, UserLocalSchema, UserSchema } from "./user.schema";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserGoogle, UserGoogleSchema } from "./schema/user-google";
import { LocalStrategy } from "./strategy/local";
import { TelegramStrategy } from "./strategy/telegram";
import { UserTelegram, UserTelegramSchema } from "./schema/user-telegram";

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: User.name,
      discriminators: [
        { name: UserLocal.name, schema: UserLocalSchema },
        { name: UserTelegram.name, schema: UserTelegramSchema }
      ],
      schema: UserSchema,
    }]),
  ],
  exports: [
    UserService
  ],
  providers: [
    UserService,
    LocalStrategy,
    TelegramStrategy,
  ],
  controllers: [
    UserController
  ]
})
export class UserModule { }
