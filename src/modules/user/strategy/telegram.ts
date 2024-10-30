import { BadRequestException, Injectable, Post, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-strategy";
import { Request } from "express";
import { LoginTelegramDto } from "../dto/login";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { createHash, createHmac } from "crypto";
import { UserTelegram, UserTelegramDocument } from "../schema/user-telegram";
import { Roles } from "src/constants/role";

type Config = {
	botToken: string;
};

class _Strategy extends Strategy {
	constructor(
		private verify: (userInfo: LoginTelegramDto) => Promise<void>,
		private config: Config
	) {
		super();
	}

	async authenticate(req: Request) {
		const data: LoginTelegramDto = req.body;
		if (!(await this.verifyTelegramData(data))) {
			this.error(new BadRequestException("Invalid token hash"));
		}
		this.verify(data)
			.then((data) => this.success(data))
			.catch((error) => {
				this.error(error);
			});
	}
	async verifyTelegramData(data: LoginTelegramDto) {
		try {
			const secret = createHash("sha256").update(this.config.botToken).digest();

			const checkString = Object.keys(data)
				.filter((key) => key !== "hash")
				.sort()
				.map((key: keyof LoginTelegramDto) => `${key}=${data[key]}`)
				.join("\n");
			const hash = createHmac("sha256", secret).update(checkString).digest("hex");

			return hash === data.hash;
		} catch (error) {
			return false;
		}
	}
}

@Injectable()
export class TelegramStrategy extends PassportStrategy(_Strategy, "telegram") {
	constructor(
		@InjectModel(UserTelegram.name) private userTelegramModel: Model<UserTelegram>,
		private jwtService: JwtService
	) {
		super(
			async (profile: LoginTelegramDto) => {
				let payload: UserTelegramDocument;
				const user = await this.userTelegramModel.findOne({
					telegramId: profile.id,
				});
				if (user) payload = user;
				else {
					payload = await this.userTelegramModel.create({
						telegramId: profile.id,
						firstName: profile.first_name,
						lastName: profile.last_name,
						picture: profile.photo_url,
						authDate: profile.auth_date,
						username: profile.username,
						role: Roles.User,
					});
				}
				const accessToken = this.jwtService.sign(payload.toObject());
				return { accessToken };
			},
			{
				botToken: process.env.TELEGRAM_BOT_TOKEN,
			}
		);
	}
}
