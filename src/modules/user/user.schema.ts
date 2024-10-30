import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";
import { BaseSchema } from "src/base";
import { Roles } from "src/constants/role";
import { generateReferralCode } from "src/utils/helper";

export type UserDocument = Document & User;

export enum UserSource {
	local = "UserLocal",
	telegram = "UserTelegram",
	google = "UserGoolge",
}

export class DefaultUser extends BaseSchema {
	role: Roles;
	source: UserSource;
	firstName?: string;
	lastName?: string;
	picture?: string;
	referralCode: string;
	skipReferral: boolean;
}

@Schema({
	timestamps: true,
	discriminatorKey: "source",
})
export class User extends DefaultUser {
	@Prop({
		enum: Roles,
		required: true,
	})
	role: Roles;

	@Prop({
		enum: UserSource,
		required: true,
	})
	@ApiProperty()
	source: UserSource;

	@Prop()
	@ApiProperty()
	firstName?: string;

	@Prop()
	@ApiProperty()
	lastName?: string;

	@Prop()
	@ApiProperty()
	picture?: string;

	@Prop({
		unique: true,
		required: true,
	})
	@ApiProperty()
	referralCode: string;

	@Prop({
		default: false,
	})
	@ApiProperty({
		default: false,
	})
	skipReferral: boolean;

	@ApiProperty({
		default: new Date(),
	})
	@Prop({
		default: new Date(-8640000000000000),
	})
	notificationSeenTimestamp: Date;
}
export const UserSchema = SchemaFactory.createForClass(User).pre("validate", async function () {
	this.referralCode = generateReferralCode();
});
UserSchema.plugin(require("mongoose-autopopulate"));
UserSchema.index({
	email: 1,
});

export * from "./schema/user-local";
