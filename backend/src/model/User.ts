import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
    _id: string;
	email: string;
	password: string;
}

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});

const User = model<IUser>("User", UserSchema);

export default User;
