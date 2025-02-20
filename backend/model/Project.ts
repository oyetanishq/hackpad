import { Document, Schema, model } from "mongoose";

export interface IProject extends Document {
	_id: string;
	name: string;
	description: string;
	content: string;
	uid: Schema.Types.ObjectId;
	accessTo: [Schema.Types.ObjectId];
}

const ProjectSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		default: "",
	},
	content: {
		type: String,
		default: "",
	},
	uid: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	accessTo: {
		type: Array<Schema.Types.ObjectId>,
		default: [],
	},
});

const Project = model<IProject>("Project", ProjectSchema);

export default Project;
