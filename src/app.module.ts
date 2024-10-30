import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./modules/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { WalletModule } from "./modules/wallet/wallet.module";
import { JupiterModule } from "./modules/jupiter/jupiter.module";
import { getMongoUri } from "./utils/helper";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		MongooseModule.forRoot(getMongoUri()),
		JwtModule.register({
			global: true,
			secret: process.env.JWT_SECRET,
			signOptions: {
				expiresIn: process.env.JWT_EXPIRE,
			},
		}),
		UserModule,
		WalletModule,
		JupiterModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
