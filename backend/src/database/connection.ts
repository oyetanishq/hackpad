import mongoose, { ConnectOptions } from "mongoose";

const connectToDB = async () => {
	try {
		/* MONGOOSE CONNECT */
		mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_CONNECTION_URL}`, {
			dbName: process.env.MONGO_DB_LOCAL_DATABASE_NAME,
		} as ConnectOptions);

		/* ON ERROR AND OPEN CONNECTION */
		mongoose.connection.on("error", () => console.log("error database"));
		mongoose.connection.once("open", () => console.log("connected to database"));
	} catch (error) {
		console.log((error as Error).message);
	}
};

export default connectToDB;
